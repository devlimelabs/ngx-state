<h1 align="center">@devlime/ngx-state</h1>
<p align="center">Simple State Management Utilities for Angular Apps</p>

<p align="center">
  <a href="https://circleci.com/gh/devlimelabs/ngx-state/tree/master">
    <img alt="CircleCI" src="https://img.shields.io/circleci/build/gh/devlimelabs/ngx-state/master?style=flat&token=08611d93f1898392311a4fc6b6fe87f48eaa5ad7">
  </a>
  <a href="https://codecov.io/gh/devlimelabs/ngx-state">
    <img alt="Codecov branch" src="https://img.shields.io/codecov/c/gh/devlimelabs/ngx-state/master?style=flat">
  </a>
  <a href="https://greenkeeper.io/">
    <img alt="Greenkeeper badge" src="https://badges.greenkeeper.io/devlimelabs/ngx-state.svg">
  </a>
  <a href="http://commitizen.github.io/cz-cli/">
    <img alt="Commitizen friendly" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg">
  </a>
  <a href="https://github.com/semantic-release/semantic-release">
    <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
  </a>
</p>

- Demo - Coming Soon!
- [Setup](#setup)
- [Usage](#usage)
- [schematics](#schematics)
- [inspiration](#inspiration)
- [License](#license)

## Let's make state easy
**@devlime/ngx-state** was created to simplify state management in Angular applications. We do not consider it a "framework" but rather a bag of utilities to help make the world a better place by making performant state management **EASY** in Angular without the need to learn YET ANOTHER FRAMEWORK or REDUX! @devlime/ngx-state provides a **VERY SIMPLE** type-safe state class to extend from, a handful of decorators to help make your life more enjoyable while keeping state CLEAN & READABLE, and a `*subscribe` directive so you aren't `*ngIf`ing your life away

## Setup
`yarn add @devlime/ngx-state` *if you wanna be hip*

or

`npm install @devlime/ngx-state --save` *if your neck has a beard*

## Usage
Bear with us... We promise next time you check this it will be filled in

### State
The `State` *"service"* class is a base class to extend your state(s) from. It takes in an interface and provides a type-safe set function. It is recommended that your States be used only to store your state data and that's it.
#### State Usage Example:
<img alt="Basic state class example" src="./assets/state.png">

#### State `set` Usage Example:
<img alt="Basic state set usage example" src="./assets/auth-service.png">

### Decorators
The decorators in @devlime/ngx-state were created to make your life easy by keeping states clean and readable. Behind the scenes the property decorators leverage `Object.defineProperty` to create both hidden private, and public properties with setters and getters that provide immutability and indirect access to your state data.

#### @StateProp (it's just a variable yall)
> ##### Type Parameters
> T: extends State,
> P: value type
> ##### Parameters
> defaultValue: P = null

#### @StateBehavior (it's just a BehaviorSubject yall)
> ##### Type Parameters
> T: extends State,
> P: BehaviorSubject value type
> ##### Parameters
> defaultValue: P = null

#### @StateReplay (it's just a ReplaySubject yall)
> ##### Type Parameters
> T: extends State,
> P: ReplaySubject value type
> ##### Parameters
> replaylength: number = 1

#### @StateSubject (it's just a Subject yall)
> ##### Type Parameters
> T: extends State,
> P: value type
> ##### Parameters
> N/A

## Schematics
Angular schematics for @devlime/ngx-state are already underway! Update coming soon!

## Inspiration
Project inspired by Angular and how awesome it is when used properly (with great power comes great responsibility). 

## Contact
Created by [John Pribesh](mailto:john@devlimelabs.com) for Devlime Labs

## License
@devlime/ngx-state is released under the
[MIT license](https://opensource.org/licenses/MIT) for you to enjoy, abuse, or fall in love and have 3 kids with. This is our gift to you and what you do with it is your call!
