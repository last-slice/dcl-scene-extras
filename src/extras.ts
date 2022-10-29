import { MoveTransformComponent, RotateTransformComponent } from '@dcl/ecs-scene-utils'
import * as CONFIG from './config'

/**
 * Define which Avatar Base Shape to use.
 *
 * @param MALE - Base Male Avatar
 * @param FEMALE - Base Male Avatar
 * @public
 */
export enum EXTRA_BODY_TYPE {
    MALE= "BaseMale",
    FEMALE= "BaseFemale"
}

/**
 * List of all extras in scene
 *
 * @public
 */
export let extras:any[] = []


/**
 * Create an extra and place in your scene.
 *
 * @param transform - Transform Args for the extra relative to the scene
 * @param body - Base Avatar type - EXTRA_BODY_TYPE.MALE | EXTRA_BODY_TYPE.FEMALE
 * @param name - The name of your extra
 * @param wearables - Optional list of wearable URNs to pass to your extra
 * @param skinColor - Optional Color4 to define the skin color, random otherwise
 * @param hairColor - Optional Color4 to define the hair color, random otherwise
 * @param eyeColor - Optional Color4 to define the eye color, random otherwise
 * @param hairstyle - OOptional Color4 to define the hair style, random otherwise
 * @returns The extra created
 * @public
 */
export function createExtra(transform:TranformConstructorArgs, body:EXTRA_BODY_TYPE, name:string,wearables?:string[], skinColor?:Color4, hairColor?: Color4, eyeColor?:Color4, hairstyle?:string, ){
    let parent = new Entity()
    parent.addComponent(new Transform())
    engine.addEntity(parent)

    let extra = new Entity('extra-' + name)
    extra.addComponent(new Transform(transform))
    let avatarShape = new AvatarShape()
    avatarShape.name = name
    avatarShape.bodyShape = "urn:decentraland:off-chain:base-avatars:" + body;
    avatarShape.wearables = [
        "urn:decentraland:off-chain:base-avatars:f_eyes_00",
        "urn:decentraland:off-chain:base-avatars:f_eyebrows_00",
        "urn:decentraland:off-chain:base-avatars:f_mouth_00",
        ];

        avatarShape.skinColor = skinColor ? skinColor : CONFIG.extraskin[getRandomIntInclusive(0, CONFIG.extraskin.length - 1)]
        avatarShape.hairColor = hairColor ? hairColor : CONFIG.extrahair[getRandomIntInclusive(0, CONFIG.extrahair.length - 1)]
        avatarShape.eyeColor = eyeColor ? eyeColor : CONFIG.extraeyes[getRandomIntInclusive(0, CONFIG.extraeyes.length - 1)]

        if(wearables){
            wearables.forEach((wearable)=>{
                avatarShape.wearables.push(wearable)
            })
        }
        else{
            body == EXTRA_BODY_TYPE.FEMALE ? avatarShape.wearables.push(CONFIG.extraFemaleTop[getRandomIntInclusive(0, CONFIG.extraFemaleTop.length -1)]) : avatarShape.wearables.push(CONFIG.extraMaleTop[getRandomIntInclusive(0, CONFIG.extraMaleTop.length -1)]) 
            body == EXTRA_BODY_TYPE.FEMALE ? avatarShape.wearables.push(CONFIG.extraFemalePants[getRandomIntInclusive(0, CONFIG.extraFemalePants.length -1)]) : avatarShape.wearables.push(CONFIG.extraMalePants[getRandomIntInclusive(0, CONFIG.extraMalePants.length -1)]) 
            body == EXTRA_BODY_TYPE.FEMALE ? avatarShape.wearables.push(CONFIG.extraFemaleShoes[getRandomIntInclusive(0, CONFIG.extraFemaleShoes.length -1)]) : avatarShape.wearables.push(CONFIG.extraMaleShoes[getRandomIntInclusive(0, CONFIG.extraMaleShoes.length -1)])     
        }

        if(hairstyle){
            avatarShape.wearables.push(hairstyle) 
        }
        else{
            body == EXTRA_BODY_TYPE.FEMALE ? avatarShape.wearables.push(CONFIG.extraFemaleHairstyle[getRandomIntInclusive(0, CONFIG.extraFemaleHairstyle.length -1)]) : avatarShape.wearables.push(CONFIG.extraMaleHairstyle[getRandomIntInclusive(0, CONFIG.extraMaleHairstyle.length -1)]) 
        }

    extra.addComponent(avatarShape)
    engine.addEntity(extra)
    extras.push(extra)
    return extra
}

/**
 * Trigger an emote on a list of extras
 *
 * @param extras - An array of extras to trigger emotes
 * @param emotes - An array of emotes to trigger for each extra; pass only 1 to apply to all extras
 * @public
 */
export function triggerExtraEmote(extras:any[], emotes:string[]){
    extras.forEach((extra:any, i:number)=>{   
        if(emotes && extras.length == emotes.length){
            extra.getComponent(AvatarShape).expressionTriggerId = emotes[i]
            extra.getComponent(AvatarShape).expressionTriggerTimestamp = Math.round(+new Date() / 1000)
        }
        else{
            extra.getComponent(AvatarShape).expressionTriggerId = emotes[0]
            extra.getComponent(AvatarShape).expressionTriggerTimestamp = Math.round(+new Date() / 1000)
        }
    })
}

/**
 * Stop the list of extras from emoting
 *
 * @param extras - An array of extras to trigger emotes
 * @public
 */
export function triggerExtraStop(extras:any[]){
    extras.forEach((extra:any)=>{   
        extra.getComponent(AvatarShape).expressionTriggerTimestamp = Math.round(+new Date() / 1000)
    })
}

/**
 * Move a specific extra
 *
 * @param extra - the extra entity to move
 * @param start - the starting position to move the extra from
 * @param end - the ending position to move the extra to
 * @param duration - the duration of the move
 * @param callback - the function to call once the move is complete
 * @public
 */
export function moveExtra(extra:Entity, start:Vector3, end:Vector3, duration:number, callback?:() => void){
    extra.addComponentOrReplace(new MoveTransformComponent(start, end, duration, callback))
}

/**
 * Rotate a specific extra
 *
 * @param extra - the extra entity to move
 * @param start - the starting rotation to move the extra from
 * @param end - the ending rotation to move the extra to
 * @param duration - the duration of the rotation
 * @param callback - the function to call once the rotation is complete
 * @public
 */
export function rotateExtra(extra:Entity, start:Quaternion, end:Quaternion, duration:number, callback?:() => void){
    extra.addComponentOrReplace(new RotateTransformComponent(start, end, duration, callback))
}

function getRandomIntInclusive(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
