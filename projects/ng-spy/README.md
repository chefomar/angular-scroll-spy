# ng-spy

A scroll spy for angular.

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

##### Input

#### `SpyTarget`

##### Input

### Services

#### `ScrollSpyService`

##### Functions

##### Getters

#### Interfaces

##### `SpyOptions`
