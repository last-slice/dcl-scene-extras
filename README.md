## DCL Scene Extras

This project has the basics to start building your own library for using in Decentraland scenes.

The libraries in the [Awesome Repository](https://github.com/decentraland-scenes/Awesome-Repository#Libraries) are available for all to use. We encourage you to create and share your own as well, we'd love to see the community grow and start sharing more reusable solutions to common problems through libraries!

## Publish

See [Create Libraries](https://docs.decentraland.org/development-guide/create-libraries/) for tips on how to design and develop your library, and for simple instructions for publishing it to NPM.

Below is a template to help you craft documentation for your library, so others know how to use it.

# DCL Scene Extras Documentation

dcl-scene-extras includes helpful solutions for populating random characters in a Decentraland scene.

## Install

To use any of the helpers provided by this library:

1. Install it as an npm package. Run this command in your scene's project folder:

   ```
   npm install dcl-scene-extras
   ```

2. Add this line at the start of your game.ts file, or any other TypeScript files that require it:

   ```ts
   import * as EXTRAS from 'dcl-scene-extras'
   ```

## Usage

//list of all extras created

EXTRAS.extras

let ex = EXTRAS.createExtra({position: new Vector3(8,0,8)}, EXTRAS.EXTRA_BODY_TYPE.MALE, "Bob")

EXTRAS.moveExtra(ex, new Vector3(8,0,8), new Vector3(4,0,15), 2, ()=>{})

EXTRAS.rotateExtra(ex, Quaternion.Euler(0,0,0), Quaternion.Euler(0,90,0), 2, ()=>{})

EXTRAS.triggerExtraEmote([ex], ['wave'])

EXTRAS.triggerExtraStop([ex])

...

## Copyright info

This scene is protected with a standard Apache 2 licence. See the terms and conditions in the [LICENSE](/LICENSE) file.
