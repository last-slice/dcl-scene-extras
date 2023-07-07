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

export class Extra extends Entity{

    avatarShape:AvatarShape

    constructor(transform:TranformConstructorArgs, body:EXTRA_BODY_TYPE, name:string, wearables?:string[], emotes?:any[], skinColor?:Color4, hairColor?: Color4, eyeColor?:Color4, hairstyle?:string){
        super("extra-" + name)
        this.addComponent(new Transform(transform))

        this.avatarShape = new AvatarShape()
        this.avatarShape.name = name
        this.avatarShape.bodyShape = "urn:decentraland:off-chain:base-avatars:" + body;
        this.avatarShape.wearables = [
            "urn:decentraland:off-chain:base-avatars:f_eyes_00",
            "urn:decentraland:off-chain:base-avatars:f_eyebrows_00",
            "urn:decentraland:off-chain:base-avatars:f_mouth_00",
            ];
    
            this.avatarShape.skinColor = skinColor ? skinColor : CONFIG.extraskin[getRandomIntInclusive(0, CONFIG.extraskin.length - 1)]
            this.avatarShape.hairColor = hairColor ? hairColor : CONFIG.extrahair[getRandomIntInclusive(0, CONFIG.extrahair.length - 1)]
            this.avatarShape.eyeColor = eyeColor ? eyeColor : CONFIG.extraeyes[getRandomIntInclusive(0, CONFIG.extraeyes.length - 1)]
    
            if(wearables){
                wearables.forEach((wearable)=>{
                    this.avatarShape.wearables.push("urn:decentraland:matic:collections-v2:" + wearable)
                })
            }
            else{
                body == EXTRA_BODY_TYPE.FEMALE ? this.avatarShape.wearables.push(CONFIG.extraFemaleTop[getRandomIntInclusive(0, CONFIG.extraFemaleTop.length -1)]) : this.avatarShape.wearables.push(CONFIG.extraMaleTop[getRandomIntInclusive(0, CONFIG.extraMaleTop.length -1)]) 
                body == EXTRA_BODY_TYPE.FEMALE ? this.avatarShape.wearables.push(CONFIG.extraFemalePants[getRandomIntInclusive(0, CONFIG.extraFemalePants.length -1)]) : this.avatarShape.wearables.push(CONFIG.extraMalePants[getRandomIntInclusive(0, CONFIG.extraMalePants.length -1)]) 
                body == EXTRA_BODY_TYPE.FEMALE ? this.avatarShape.wearables.push(CONFIG.extraFemaleShoes[getRandomIntInclusive(0, CONFIG.extraFemaleShoes.length -1)]) : this.avatarShape.wearables.push(CONFIG.extraMaleShoes[getRandomIntInclusive(0, CONFIG.extraMaleShoes.length -1)])     
            }
    
            if(hairstyle){
                this.avatarShape.wearables.push(hairstyle) 
            }
            else{
                body == EXTRA_BODY_TYPE.FEMALE ? this.avatarShape.wearables.push(CONFIG.extraFemaleHairstyle[getRandomIntInclusive(0, CONFIG.extraFemaleHairstyle.length -1)]) : this.avatarShape.wearables.push(CONFIG.extraMaleHairstyle[getRandomIntInclusive(0, CONFIG.extraMaleHairstyle.length -1)]) 
            }

            if(emotes){
                this.avatarShape.emotes = []
                for(let i = 0; i < (emotes.length < 10? emotes.length : 10); i++){
                    this.avatarShape.emotes.push({urn: "urn:decentraland:matic:collections-v2:"+emotes[i], slot:i})
                }
            }

        this.addComponent(this.avatarShape)
    }

    /**
     * Change wearables for the extra
     * @param wearables 
     */
    changeWearables(wearables:string[]){
        this.avatarShape.wearables.length = 0

        this.avatarShape.wearables = [
            "urn:decentraland:off-chain:base-avatars:f_eyes_00",
            "urn:decentraland:off-chain:base-avatars:f_eyebrows_00",
            "urn:decentraland:off-chain:base-avatars:f_mouth_00",
            ];

        wearables.forEach((wearable)=>{
            this.avatarShape.wearables.push(wearable)
        })
    }

    /**
     * Rotate a specific extra
     *
     * @param start - the starting rotation to move the extra from
     * @param end - the ending rotation to move the extra to
     * @param duration - the duration of the rotation
     * @param callback - the function to call once the rotation is complete
     * @public
     */
    rotateExtra(start:Quaternion, end:Quaternion, duration:number, callback?:() => void){
        this.addComponentOrReplace(new RotateTransformComponent(start, end, duration, callback))
    }

    /**
     * Move a specific extra
     *
     * @param start - the starting position to move the extra from
     * @param end - the ending position to move the extra to
     * @param duration - the duration of the move
     * @param callback - the function to call once the move is complete
     * @public
     */
    moveExtra(start:Vector3, end:Vector3, duration:number, callback?:() => void){
        this.addComponentOrReplace(new MoveTransformComponent(start, end, duration, callback))
    }

    /**
     * Trigger an emote on an extra
     *
     * @param emote - An emote to trigger for the extra
     * @public
     */
    triggerEmote(emote:string){
        this.avatarShape.expressionTriggerId = emote
        this.avatarShape.expressionTriggerTimestamp = Math.round(+new Date() / 1000)
    }

    /**
     * Stop the extra from emoting
     *
     */
    stopEmote(){
            this.getComponent(Transform).position.z += .01
            this.getComponent(Transform).position.z -= .01
    }
}


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
export function createExtra(transform:TranformConstructorArgs, body:EXTRA_BODY_TYPE, name:string, wearables?:string[], emotes?:any[], skinColor?:Color4, hairColor?: Color4, eyeColor?:Color4, hairstyle?:string){
    // let parent = new Entity()
    // parent.addComponent(new Transform())
    // engine.addEntity(parent)

    let extra = new Extra(transform, body, name, wearables, emotes, skinColor, hairColor, eyeColor, hairstyle)
    engine.addEntity(extra)
    extras.push(extra)
    return extra
}


function getRandomIntInclusive(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
