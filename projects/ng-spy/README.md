# ng-spy

A lightweight, dependecy-free scrollspy for angular. Use this library to spy on HTML elements on your page when the window is scrolled or resized.

This library provides directives and services to help you subscribe to new elements entering the browser window and possibly adds or remove CSS classes to these elements.

This library does not provide utilities to `scrollTo` spied elements and certainly does not handle link clicks. You have to handle these on your own.

## Table of Contents
1. [Example](#Example)
2. [Usage](#Usage)
3. [Documentation](#Documentation)
    - [Directives](#Directives)
    - [Services](#Services)
    - [Interfaces](#Interfaces)
    - [Injection Tokens](#InjectionTokens)

## Example
[Checkout this example](https://chefomar.github.io/angular-scroll-spy/)

Code for the previous example is also in this repository under the src folder.

## Usage

1. `npm install --save ng-spy`
2. Import the module

    ```typescript
    @NgModule({
      declarations: [],
      imports: [
        // ...
        ScrollSpyModule
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
    ```

3. In your container component:

    ```typescript
    ngAfterViewInit() {
      this.spyService.spy({ thresholdBottom: 50 });
    }
    ```

4. Use `SpyTarget` directive to mark element as a target:

    ```html
    <h1 spyTarget="target-1">Hello, World!!</h1>
    ```

5. Optional: Use `SpyOn` directive to spy on a target:

    ```html
    <a spyOn="target-1" activeClass="navbar__link--active" class="navbar__link" href="#target-1">target 1</a>
    ```

6. Alternatively, you can subscribe to `activeSpyTarget` from `ScrollSpyService`, which will emit every time a new element is active.

    ```typescript
    this.scrollspyService.activeSpyTarget.subscribe(
      (activeTargetName: string) => console.log(activeTargetName)
    );
    ```

7. To start multiple spys you can scope the `ScrollSpyService` to a specific component or module in the `providers` array.

    ```typescript
    // In component or module metadata:
    {
      // ...
      providers: [ ScrollSpyService ]
    }
    ```

## Documentation

### Directives

#### `SpyOn`

A directive to spy on a previously added target.

##### Input

|     Name    	|  Type  	|                     Description                     	| Default value 	|
|:-----------:	|:------:	|:---------------------------------------------------:	|:-------------:	|
| activeClass 	| string 	| a class to be added to host element if it is active 	|               	|
| spyOn       	| string 	| the name of the target to spy on                    	|               	|

#### `SpyTarget`

A directive to mark an element as a spy target.

##### Input

|    Name   	|  Type  	|                                                   Description                                                   	| Default value 	|
|:---------:	|:------:	|:---------------------------------------------------------------------------------------------------------------:	|:-------------:	|
| spyTarget 	| string 	| the name of the target to be added. This also adds an id attribute to the host element with the `spyTarget` value |               	|

### Services

#### `ScrollSpyService`

##### Functions

###### `spy(spyOptions: SpyOptions): void`

Starts spying on the targets. Call this on the top level container of your targets in `AfterViewInit` lifecycle hook. Without calling this function, nothing will happen.

**Parameters:**

|    Name    	|    Type    	| Optional? 	|                                  Description                                 	|                Default value               	|
|:----------:	|:----------:	|-----------	|:----------------------------------------------------------------------------:	|:------------------------------------------:	|
| spyOptions 	| SpyOptions 	| Yes       	| Options to override some default behaviors. See SpyOptions for more details. 	| { thresholdTop = 0 , thresholdBottom = 0 } 	|

###### `addTarget(target: SpyTarget): void`

adds the `target` to the targets collection for spying. This action will also trigger a check to re-evaluate the active target.

**Parameters:**

|  Name  	|    Type   	| Optional? 	|       Description      	| Default value 	|
|:------:	|:---------:	|-----------	|:----------------------:	|:-------------:	|
| target 	| SpyTarget 	| No        	| The target to be added.	|               	|

###### `removeTarget(target: string): void`

Removes a previously added target from the targets collection. This action will also trigger a check to re-evaluate the active target.

**Parameters:**

|  Name  	|  Type  	| Optional? 	|          Description          	| Default value 	|
|:------:	|:------:	|-----------	|:-----------------------------:	|:-------------:	|
| target 	| string 	| No        	| The target name to be removed 	|               	|

###### `checkActiveElement(scrollContainer?: ElementRef): void`

Tries to find the active target in the targets collection. If found it will emit the target name using the `activeSpyTarget` observable, Otherwise it will emit null.

**Parameters:**

|       Name      	|    Type    	| Optional? 	|                       Description                       	| Default value 	|
|:---------------:	|:----------:	|-----------	|:-------------------------------------------------------:	|:-------------:	|
| scrollContainer 	| ElementRef 	| Yes       	| The scroll container in which your targets are present. 	|               	|

###### `isElementActive(element: ElementRef, scrollContainer?: ElementRef, currentActiveElement?: ElementRef): boolean`

Checks if the `element` is inside the browser window and optionally inside the `scrollContainer`.

If a `currentActiveElement` is provided, it will also check if the `element`'s offsetTop is greater than the `currentActiveElement`. Meaning, if two targets are active, only the last one on the screen will be emitted.

If a `scrollContainer` is provided, it will ignore `thresholdBottom` and `thresholdTop` in the window check and will instead check for the threshold inside the `scrollContainer`.

**Parameters:**

|         Name         	|    Type    	| Optional? 	|                    Description                    	| Default value 	|
|:--------------------:	|:----------:	|-----------	|:-------------------------------------------------:	|:-------------:	|
| element              	| ElementRef 	| No        	| The element to be checked.                        	|               	|
| scrollContainer      	| ElementRef 	| Yes       	| The scroll container which the element is inside. 	|               	|
| currentActiveElement 	| ElementRef 	| Yes       	| An element that is guaranteed to be active.       	|               	|

###### `stopSpying(): void`

Stops spying on the targets, completes the `activeSpyTarget` subject and clears the targets collection.

##### Getters

###### `activeSpyTarget: Observable<string>`

Use this to subscribe to new active spy targets. Value can be `null` if no target is found to be active.

### Interfaces

##### `SpyOptions`

|       Name      	|    Type    	| Optional? 	|                                        Description                                        	|
|:---------------:	|:----------:	|-----------	|:-----------------------------------------------------------------------------------------:	|
| scrollContainer 	| ElementRef 	| Yes       	| The scroll container in which your targets are present.                                   	|
| thresholdTop    	| number     	| Yes       	| A number added to the top of your scroll container while checking in `isElementActive`    	|
| thresholdBottom 	| number     	| Yes       	| A number added to the bottom of your scroll container while checking in `isElementActive` 	|

##### `SpyTarget`

|   Name  	|    Type    	| Optional? 	|                                                    Description                                                   	|
|:-------:	|:----------:	|-----------	|:----------------------------------------------------------------------------------------------------------------:	|
| name    	| string     	| No        	| The name of the spy target. This is also may be used as an id for the html element. So make sure this is unique. 	|
| element 	| ElementRef 	| No        	| A reference to the target element.                                                                               	|

### InjectionTokens

#### `RESIZE_TIME_THRESHOLD`

Used in the resize event with `auditTime`.

**Default Value**: 300

#### `SCROLL_TIME_THRESHOLD`

Used in the scroll events with `auditTime`.

**Default Value**: 10
