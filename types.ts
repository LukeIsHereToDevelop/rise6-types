type scriptEvent = "onLoad" | "onUnload" | "onExecute";
type moduleEvent = "onAttack" | "onChatInput" | "onClick" | "onEntityRender" | "onHitSlowDown" | "onJump" | "onKeyboardInput" | "onKill" | "onMoveInput" | "onPostMotion" | "onPreMotion" | "onStrafe" | "onPreUpdate" | "onRender2D" | "onRender3D" | "onWater" | "onTick" | "onSlowDown";
type eventCallback = (event: Event) => undefined;

interface FontRenderer {
    /**
     * Returns the text width.
     * @param text Text to calculate the width of.
     */
    width(text: string): number;
    /**
     * Returns the font height.
     */
    height(): number;
    /**
     * Renders a string. The function name speaks for itself.
     * @param text Text to draw.
     * @param x X position of the string to draw.
     * @param y Y position of the string to draw.
     * @param color 4-element array with the RGBA color to use. Example: [255, 255, 255, 255] would translate to a white color. **You are not required to provide the alpha.**
     */
    draw(text: string, x: number, y: number, color: number[]): undefined;
    /**
     * Renders a string. The function name speaks for itself.
     * @param text Text to draw.
     * @param x X position of the string to draw.
     * @param y Y position of the string to draw.
     * @param color 4-element array with the RGBA color to use. Example: [255, 255, 255, 255] would translate to a white color. **You are not required to provide the alpha.**
     */
    drawCentered(text: string, x: number, y: number, color: number[]): undefined;
    /**
     * Renders a string. The function name speaks for itself.
     * @param text Text to draw.
     * @param x X position of the string to draw.
     * @param y Y position of the string to draw.
     * @param color 4-element array with the RGBA color to use. Example: [255, 255, 255, 255] would translate to a white color. **You are not required to provide the alpha.**
     */
    drawWithShadow(text: string, x: number, y: number, color: number[]): undefined;
    /**
     * Renders a string. The function name speaks for itself.
     * @param text Text to draw.
     * @param x X position of the string to draw.
     * @param y Y position of the string to draw.
     * @param color 4-element array with the RGBA color to use. Example: [255, 255, 255, 255] would translate to a white color. **You are not required to provide the alpha.**
     */
    drawCenteredWithShadow(text: string, x: number, y: number, color: number[]): undefined;
}

/**
 * 3 dimensional vector. Parameters: x, y, z.
 */
interface Vector3 {
    /**
     * Returns the `X` value.
     */
    getX(): number;
    /**
     * Returns the `Y` value.
     */
    getY(): number;
    /**
     * Returns the `Z` value.
     */
    getZ(): number;
}

/**
 * 2 dimensional vector. Parameters: x, y.
 */
interface Vector2 {
    /**
     * Returns the `X` value.
     */
    getX(): number;
    /**
     * Returns the `Y` value.
     */
    getY(): number;
}

interface ItemStack {
    /**
     * Returns the amount of items in the itemstack.
     */
    getAmount(): number;
    /**
     * Returns the maximum amount of items that can be stacked in the stack.
     */
    getMaxAmount(): number;
    /**
     * Returns the Item ID.
     */
    getItemId(): number;
    /**
     * Returns the Item **display name**.
     */
    getName(): string;
}

interface Inventory {
    /**
     * Returns all the item stacks in the inventory.
     */
    getItemStacks(): ItemStack[];
    /**
     * Returns the item stack in specified slot.
     * @param slot
     */
    getItemInSlot(slot: number): ItemStack;
}

interface Command {
    /**
     * Unregisters the command.
     */
    unregister(): undefined;
    /**
     * Returns the command name.
     */
    getName(): string;
    /**
     * Returns the command description.
     */
    getDescription(): string;
    /**
     * Adds a handler. The only supported callback for commands is `onExecute`.
     * @param type The type of event to handle.
     * @param handler Callback function.
     */
    handle(type: scriptEvent, handler: eventCallback): undefined;
}

interface Module {
    /**
     * Unregisters the module
     */
    unregister(): undefined;
    /**
     * Toggles the module.
     */
    toggle(): undefined;
    /**
     * Returns the module name.
     */
    getName(): string;
    /**
     * Returns the module category. 
     */
    getCategory(): string;
    /**
     * Returns the module description.
     */
    getDescription(): string;
    /**
     * Returns if the module is enabled or not.
     */
    isEnabled(): boolean;
    /**
     * Adds a event handler. Handler lists can be found in [events documentation](https://riseclients-organization.gitbook.io/rise-6-scripting-api/api-documentation/events).
     * @param type 
     * @param handler 
     */
    handle(type: moduleEvent, handler: eventCallback): undefined;
    /**
     * Enables/disables the module.
     * @param enabled Whether the module will be enabled.
     */
    setEnabled(enabled: boolean): undefined;
    /**
     * Registers a setting to the module. 
     * For the `number` setting, the first and second additional parameters are minimum and maximum bounds for the setting, while the third one is for the decimal places (**not required, defaults to 2 decimal places.**) Default value type is JS Number.
     * For the `boundsnumber` setting, the first additional parameters argument is the second default value. 2nd and 3rd arguments are minimum and maximum bounds for both of the numbers. The last parameter is step size for the setting. Default value type is JS Number.
     * For the `boolean` and `string` settings, the additional parameters do not exist. Default values for them correspond to their JavaScript types.
     * For the `color` setting, there are no additional parameters. Default value type is a 3 or 4 element array, with the elements corrseponding to the RGB(A) channel values. 4th element for the Alpha channel in the array is not required.
     * For the `mode` setting, the additional parameters are all the sub-modes.
     * @param type The type of setting to register. Currently supported types are: `string`, `number`, `boundsnumber`, `boolean`, `color`, or `mode`.
     * @param name Setting name.
     * @param defaultValue Default value for the setting. Type is: `string` for string settings and mode setting, `Number` for number, `boundsnumber` settings, `Boolean` for boolean settings, and 3 or 4 element `Number` array for color settings, with the elements corresponding to RGBA.
     * @param params Additional parameters. See the method description.
     */
    registerSetting(type: string, name: string, defaultValue: boolean | number[] | number | string, ...params: any): undefined;
    /**
     * Sets a setting of the module. Read the documentation for the method above to see more information.
     * @param name Setting name.
     * @param value The new value for the setting. Type is: `string` for string settings and mode setting, `Number` for number, `boundsnumber` settings, `Boolean` for boolean settings, and 3 or 4 element `Number` array for color settings, with the elements corresponding to RGBA.
     */
    setSetting(name: string, value: boolean | number[] | number | string): undefined;
    /**
     * Returns the setting value.
     * For the `boolean` setting, it returns a Boolean object.
     * For the `string` setting, it returns a String object.
     * For the `boundsnumber` setting, it returns a 2 element array, with the 1st element corresponding to the 1st value and the 2nd element corresponding to the 2nd value.
     * For the `number` setting, it returns a Number object.
     * For the `color` setting, it returns a 4-element array that you can use in other scripting APIs (Like the [Render API](https://riseclients-organization.gitbook.io/rise-6-scripting-api/api-documentation/global-namespaces/render)).
     * For the `mode` setting, it returns the mode name.
     * @param name Setting name.
     */
    getSetting(name: string): boolean | number[] | number | string;
    /**
     * Sets the setting visibility.
     * @param name Setting name.
     * @param visible Whether to draw the setting or not.
     */
    setSettingVisibility(name: string, visible: boolean): undefined;
}

interface EntityLiving {
    /**
     * Returns if the entity is an animal.
     */
    isAnimal(): boolean;
    /**
     * Returns if the entity is a mob.
     */
    isMob(): boolean;
    /**
     * Retuurns if the entity is a player.
     */
    isPlayer(): boolean;
    /**
     * Returns the entity health.
     */
    getHealth(): number;
    /**
     * Returns the maximum entity health.
     */
    getMaxHealth(): number;
    /**
     * Returns the entity hurt time.
     */
    getHurtTime(): number;
    /**
     * Returns the maximum entity hurt time.
     */
    getMaxHurtTime(): number;
    /**
     * Returns the previous tick entity hurt time.
     */
    getLastHurtTime(): number;
    /**
     * Returns the currently held item stack of the entity.
     */
    getHeldItemStack(): ItemStack;
    /**
     * Returns if the entity is dead.
     */
    isDead(): boolean;
    /**
     * Returns if the entity is instance of LivingEntity.
     */
    isLiving(): boolean;
    /**
     * Returns the entity position.
     */
    getPosition(): Vector3;
    /**
     * Returns the previous tick entity position.
     */
    getLastPosition(): Vector3;
    /**
     * Returns the entity motion.
     */
    getMotion(): Vector3;
    /**
     * Returns the entity rotation.
     */
    getRotation(): Vector2;
    /**
     * Returns the previous tick entity rotation.
     */
    getLastRotation(): Vector2;
    /**
     * Returns the amount of ticks the entity has existed for.
     */
    getTicksExisted(): number;
    /**
     * Returns the entity ID.
     */
    getEntityId(): number;
    /**
     * Returns the entity display name.
     */
    getDisplayName(): string;
    /**
     * Returns the inventory of the entity.
     */
    getInventory(): Inventory;
    /**
     * Returns distance between this and another entity.
     * @param entity Another entity
     */
    getDistanceToEntity(entity: Entity): number;
    /**
     * Returns the distance between this entity and the specified position.
     * @param x X position.
     * @param y Y position.
     * @param z Z position.
     */
    getDistance(x: number, y: number, z: number): number;
}

interface Entity {
    /**
     * Returns if the entity is instance of LivingEntity.
     */
    isLiving(): boolean;
    /**
     * Returns the entity position. 
     */
    getPosition(): Vector3;
    /**
     * Returns the previous tick entity position.
     */
    getLastPosition(): Vector3;
    /**
     * Returns the entity motion.
     */
    getMotion(): Vector3;
    /**
     * Returns the entity rotation.
     */
    getRotation(): Vector2;
    /**
     * Returns the previous tick entity rotation.
     */
    getLastRotation(): Vector2;
    /**
     * Returns the amount of ticks the entity has existed for.
     */
    getTicksExisted(): number;
    /**
     * Returns the entity ID.
     */
    getEntityId(): number;
    /**
     * Returns the entity display name.
     */
    getDisplayName(): string;
    /**
     * Returns the inventory of the entity.
     */
    getInventory(): Inventory;
    /**
     * Returns distance between this and another entity.
     * @param entity Another entity
     */
    getDistanceToEntity(entity: Entity): number;
    /**
     * Returns the distance between this entity and the specified position.
     * @param x X position.
     * @param y Y position.
     * @param z Z position.
     */
    getDistance(x: number, y: number, z: number): number;
}

interface Event {
    /**
     * This method returns the Event Handler name.
     */
    getHandlerName(): string;
    /**
     * Returns if the event has been cancelled or not.
     */
    isCancelled(): boolean;
    /**
     * Sets the cancelled state of the event.
     * @param cancelled
     */
    setCancelled(cancelled: boolean): undefined;
}

declare namespace script {
    /**
     * Adds a event handler. Handler lists can be found in [events documentation](https://riseclients-organization.gitbook.io/rise-6-scripting-api/api-documentation/events).
     * @param event The type of event to handle.
     * @param callback The callback function.
     */
    export function handle(event: scriptEvent, callback: eventCallback): undefined;
}

declare namespace render {
    /**
     * Returns a 3-dimensional vector that stores the camera position.
     */
    export function getCameraPosition(): Vector3;
    /**
     * Renders a rectangle. Names are self-explanatory.
     * @param x X position.
     * @param y Y position.
     * @param width Rectangle width.
     * @param height Rectangle height.
     * @param color 3 or 4 dimensional array with the RGBA colors.
     */
    export function rectangle(x: number, y: number, width: number, height: number, color?: number[]): undefined;
    /**
     * Renders a rectangle. Names are self-explanatory.
     * @param x X position.
     * @param y Y position.
     * @param width Rectangle width.
     * @param height Rectangle height.
     */
    export function rainbowRectangle(x: number, y: number, width: number, height: number): undefined;
    /**
     * Renders a rectangle. Names are self-explanatory.
     * @param x X position.
     * @param y Y position.
     * @param width Rectangle width.
     * @param height Rectangle height.
     * @param color 3 or 4 dimensional array with the RGBA colors.
     */
    export function centeredRectangle(x: number, y: number, width: number, height: number, color?: number[]): undefined;
    /**
     * Renders a rectangle. Names are self-explanatory.
     * @param x X position.
     * @param y Y position.
     * @param width Rectangle width.
     * @param height Rectangle height.
     * @param color 3 or 4 dimensional array with the RGBA colors.
     */
    export function roundedRectangle(x: number, y: number, width: number, height: number, color: number[]): undefined;
    /**
     * Renders a rectangle. Names are self-explanatory.
     * @param x X position.
     * @param y Y position.
     * @param width Rectangle width.
     * @param height Rectangle height.
     * @param radius Rounding radius.
     * @param thickness Rounded outline rectangle thickness.
     */
    export function roundedRectangleOutline(x: number, y: number, width: number, height: number, radius: number, thickness: number): undefined;
    /**
     * Renders an item icon.
     * @param x X position.
     * @param y Y position.
     * @param itemstack Item to render.
     */
    export function renderItemIcon(x: number, y: number, itemstack: ItemStack): undefined;
    /**
     * Draws a line from one position in the world to another.
     * @param xFrom First position.
     * @param yFrom First position.
     * @param zFrom First position.
     * @param xTo Second position.
     * @param yTo Second position.
     * @param zTo Second position.
     * @param color 3 or 4 dimensional array with the RGBA colors.
     * @param width Line width.
     * @param vectorFrom First position.
     * @param vectorTo Second position.
     */
    export function drawLine3D(xFrom: number, yFrom: number, zFrom: number, xTo: number, yTo: number, zTo: number, color: number[], width: number, vectorFrom?: Vector3, vectorTo?: Vector3): undefined;
    /**
     * Smoothes the camera out on the Y position by not updating the camera Y position.
     */
    export function smoothCamera(): undefined;
    /**
     * Creates and returns a new [FontRenderer object](https://riseclients-organization.gitbook.io/rise-6-scripting-api/api-documentation/objects/fontrenderer).
     * @param name Font name.
     * @param size Font size.
     * @param antialiasing Whether to use anti-aliasing on the font renderer or not.
     */
    export function getMinecraftFontRenderer(): FontRenderer;
    /**
     * Creates and returns a new [FontRenderer object](https://riseclients-organization.gitbook.io/rise-6-scripting-api/api-documentation/objects/fontrenderer).
     * @param name Font name.
     * @param size Font size.
     * @param antialiasing Whether to use anti-aliasing on the font renderer or not.
     */
    export function getCustomFontRenderer(name: string, size: number, antialiasing: boolean): FontRenderer;
    /**
     * Creates and returns a new [FontRenderer object](https://riseclients-organization.gitbook.io/rise-6-scripting-api/api-documentation/objects/fontrenderer).
     * @param name Font name.
     * @param size Font size.
     * @param antialiasing Whether to use anti-aliasing on the font renderer or not.
     */
    export function getCustomFontRendererBold(name: string, size: number, antialiasing: boolean): FontRenderer;
    /**
     * Creates and returns a new [FontRenderer object](https://riseclients-organization.gitbook.io/rise-6-scripting-api/api-documentation/objects/fontrenderer).
     * @param name Font name.
     * @param size Font size.
     * @param antialiasing Whether to use anti-aliasing on the font renderer or not.
     */
    export function getCustomFontRendererItalic(name: string, size: number, antialiasing: boolean): FontRenderer;
    /**
     * Creates and returns a new [FontRenderer object](https://riseclients-organization.gitbook.io/rise-6-scripting-api/api-documentation/objects/fontrenderer).
     * @param name Font name.
     * @param size Font size.
     * @param antialiasing Whether to use anti-aliasing on the font renderer or not.
     */
    export function getCustomFontRendererBoldItalic(name: string, size: number, antialiasing: boolean): FontRenderer;
    /**
     * Returns the eye height.
     */
    export function getEyeHeight(): number;
    /**
     * Returns the theme accent color.
     */
    export function getThemeColor(): number[];
    /**
     * Applies an effect to a block of code.
     * @param callback Body of the function to apply a specified effect to.
     */
    export function blur(callback: Function): undefined;
    /**
     * Applies an effect to a block of code.
     * @param callback Body of the function to apply a specified effect to.
     */
    export function postBloom(callback: Function): undefined;
    /**
     * Applies an effect to a block of code.
     * @param callback Body of the function to apply a specified effect to.
     */
    export function outline(callback: Function): undefined;
}

declare namespace input {
    /**
     * Returns whether the Forward movement key (defaults to W) is down.
     */
    export function isKeyBindForwardDown(): boolean;
    /**
     * Returns whether the Back movement key (defaults to S) is down.
     */
    export function isKeyBindBackDown(): boolean;
    /**
     * Returns whether the Left movement key (defaults to A) is down.
     */
    export function isKeyBindLeftDown(): boolean;
    /**
     * Returns whether the Right movement key (defaults to D) is down.
     */
    export function isKeyBindRightDown(): boolean;
    /**
     * Returns whether the Jump movement key (defaults to Space) is down.
     */
    export function isKeyBindJumpDown(): boolean;
    /**
     * Returns whether the Sneak movement key (defaults to Shift) is down.
     */
    export function isKeyBindSneakDown(): boolean;
    /**
     * Returns whether the Attack key (defaults to LMB) is down.
     */
    export function isKeyBindAttackDown(): boolean;
    /**
     * Returns whether the Use Item key (defaults to RMB) is down.
     */
    export function isKeyBindUseItemDown(): boolean;
    /**
     * Returns whether the Drop key (defaults to Q) is down.
     */
    export function isKeyBindDropDown(): boolean;
    /**
     * Returns whether the Inventory key (defaults to E) is down.
     */
    export function isKeyBindInventoryDown(): boolean;
    /**
     * Returns whether the Chat key (defaults to T) is down.
     */
    export function isKeyBindChatDown(): boolean;
    /**
     * Returns whether the Player list key (defaults to TAB) is down.
     */
    export function isKeyBindPlayerListDown(): boolean;
    /**
     * Returns whether the Command key (defaults to '/') is down.
     */
    export function isKeyBindCommandDown(): boolean;
    /**
     * Returns whether the Screenshot key (defaults to F2) is down.
     */
    export function isKeyBindScreenshotDown(): boolean;
    /**
     * Returns whether the Toggle Perspective (more known as the Third Person) key (defaults to F5) is down.
     */
    export function isKeyBindTogglePerspectiveDown(): boolean;
    /**
     * Returns whether the Full Screen key (defaults to F11) is down.
     */
    export function isKeyBindFullscreenDown(): boolean;
    /**
     * Returns whether the Spectatour Outlines key is down.
     */
    export function isKeyBindSpectatorOutlinesDown(): boolean;
    /**
     * Returns whether the specified key is down. To get the ID of a key, [refer to this table](https://gist.github.com/Mumfrey/5cfc3b7e14fef91b6fa56470dc05218a).
     * @param key The LWJGL ID of a key.
     */
    export function isKeyDown(key: number): boolean;
    /**
     * Returns whether the specified mouse button is down.
     * @param button The LWJGL ID of a button.
     */
    export function isButtonDown(button: number): boolean;
}

declare namespace world {
    /**
     * Returns the dimension name.
     */
    export function getDimensionName(): string;
    /**
     * Returns the dimension ID.
     */
    export function getDimensionId(): number;
    /**
     * Returns the dimension time.
     */
    export function getDimensionTime(): number;
    /**
     * Returns all of the loaded/visible entities.
     */
    export function getLivingEntities(): EntityLiving[];
    /**
     * Returns all of the loaded/visible targetable entities in a certain range.
     * @param range The maximum amount of range to get entities from.
     */
    export function getTargetEntities(range: number): EntityLiving[];
    /**
     * Returns the closest targetable entity in a certain range.
     * @param range The maximum amount of range to get the entity from.
     */
    export function getTargetEntity(range: number): EntityLiving;
    /**
     * Returns all of the loaded/visible entities.
     */
    export function getEntities(): Entity[];
}

declare namespace rise {
    /**
     * Returns and registers a new Module with custom name and description.
     * @param name Name of the module. 
     * @param description Description of the module.
     */
    export function registerModule(name: string, description: string): Module;
    /**
     * Renames the client to the new `name`.
     * @param name New name of the client.
     */
    export function setName(name: string): undefined;
    /**
     * Returns an array of every module.
     */
    export function getModules(): Module[];
    /**
     * Returns a module by name.
     * @param name The name of the module.
     */
    export function getModule(name: string): Module;
    /**
     * Returns and registers a new Command with custom name and description.
     * @param name Name of the command
     * @param description Description of the command.
     */
    export function registerCommand(name: string, description: string): Command;
    /**
     * Returns an array of every command.
     */
    export function getCommands(): Command[];
    /**
     * Returns a command by name.
     * @param name The name of the command.
     */
    export function getCommand(name: string): Command;
    /**
     * Displays a message in chat.
     * @param message Message to display.
     */
    export function displayChat(message: string): undefined;
    /**
     * Returns the client name.
     */
    export function getRiseName(): string;
    /**
     * Returns the client version.  
     */
    export function getRiseVersion(): string;
    /**
     * Returns `System.currentTimeMillis()`.
     */
    export function getSystemMillis(): number;
    /**
     * Returns a new Vector2 with X and Y as points.
     * @param x X position
     * @param y Y position
     */
    export function newVec2(x: number, y: number): Vector2;
    /**
     * Returns a new Vector3 with X, Y, Z as points.
     * @param x X position
     * @param y Y position
     * @param z Z position
     */
    export function newVec3(x: number, y: number, z: number): Vector3;
    /**
     * Displays a new Information notification.
     * @param title Title of the notification.
     * @param message Body/message of the notification.
     * @param time The amount of time to diplsay the notification for. **This parameter is optional.**
     */
    export function displayInfoNotification(title: string, message: string, time?: number): undefined;
    /**
     * Spoofs the ping. The default mode is `normal`.
     * @param delay The ping delay to use/spoof.
     * @param normal The ping spoof type to use. **This parameter is optional.**
     * @param teleport The ping spoof type to use. **This parameter is optional.**
     * @param velocity The ping spoof type to use. **This parameter is optional.**
     * @param entity The ping spoof type to use. **This parameter is optional.**
     */
    export function pingspoof(delay: number, normal?: boolean, teleport?: boolean, velocity?: boolean, entity?: boolean): undefined;
    /**
     * Blinks the player.
     */
    export function blink(): undefined;
    /**
     * Sends all delayed/blinked packets.
     */
    export function dispatch(): undefined;
}

/**
 * This is based on EntityLiving class, therefore this support every method from Entity, as well as EntityLiving class.
 */
declare namespace player {
    /**
     * Returns if the entity is an animal.
     */
    export function isAnimal(): boolean;
    /**
     * Returns if the entity is a mob.
     */
    export function isMob(): boolean;
    /**
     * Retuurns if the entity is a player.
     */
    export function isPlayer(): boolean;
    /**
     * Returns the entity health.
     */
    export function getHealth(): number;
    /**
     * Returns the maximum entity health.
     */
    export function getMaxHealth(): number;
    /**
     * Returns the entity hurt time.
     */
    export function getHurtTime(): number;
    /**
     * Returns the maximum entity hurt time.
     */
    export function getMaxHurtTime(): number;
    /**
     * Returns the previous tick entity hurt time.
     */
    export function getLastHurtTime(): number;
    /**
     * Returns the currently held item stack of the entity.
     */
    export function getHeldItemStack(): ItemStack;
    /**
     * Returns if the entity is dead.
     */
    export function isDead(): boolean;
    /**
     * Returns if the entity is instance of LivingEntity.
     */
    export function isLiving(): boolean;
    /**
     * Returns the entity position.
     */
    export function getPosition(): Vector3;
    /**
     * Returns the previous tick entity position.
     */
    export function getLastPosition(): Vector3;
    /**
     * Returns the entity motion.
     */
    export function getMotion(): Vector3;
    /**
     * Returns the entity rotation.
     */
    export function getRotation(): Vector2;
    /**
     * Returns the previous tick entity rotation.
     */
    export function getLastRotation(): Vector2;
    /**
     * Returns the amount of ticks the entity has existed for.
     */
    export function getTicksExisted(): number;
    /**
     * Returns the entity ID.
     */
    export function getEntityId(): number;
    /**
     * Returns the entity display name.
     */
    export function getDisplayName(): string;
    /**
     * Returns the inventory of the entity.
     */
    export function getInventory(): Inventory;
    /**
     * Returns distance between this and another entity.
     * @param entity Another entity
     */
    export function getDistanceToEntity(entity: Entity): number;
    /**
     * Returns the distance between this entity and the specified position.
     * @param x X position.
     * @param y Y position.
     * @param z Z position.
     */
    export function getDistance(x: number, y: number, z: number): number;
    /**
     * Sends a chat message.
     * @param text Text to send in the chat.
     * @param message Message to send in the chat. **You can not execute rise commands with this.**
     */
    export function message(text?: string, message?: string): undefined;
    /**
     * Returns the player name.
     */
    export function getName(): string;
    /**
     * Returns the player ID.
     */
    export function getPlayerID(): string;
    /**
     * Returns the `mc.thePlayer.onGround` variable.
     */
    export function isOnGround(): boolean;
    /**
     * Returns if the player is moving or not.
     */
    export function isMoving(): boolean;
    /**
     * Makes the player jump.
     */
    export function jump(): undefined;
    /**
     * Makes the player strafe. `speed` argument is optional.
     * @param speed The speed to strafe at.
     */
    export function strafe(speed?: number): undefined;
    /**
     * Stops the player instantly.
     */
    export function stop(): undefined;
    /**
     * Sets the player position with 3 `Number` arguments or a single Vector3d argument.
     * @param posX Position X.
     * @param posY Position Y.
     * @param posZ Position Z.
     * @param vector Vector3d with the player position.
     */
    export function setPosition(posX?: number, posY?: number, posZ?: number, vector?: Vector3): undefined;
    /**
     * Sets the player motion with 3 `Number` arguments or a single Vector3d argument.
     * @param motionX Motion X.
     * @param motionY Motion Y.
     * @param motionZ Motion Z.
     * @param vector Vector3d with the player motion.
     */
    export function setMotion(motionX?: number, motionY?: number, motionZ?: number, vector?: Vector3): undefined;
    /**
     * Sets the player motion on the X axis.
     * @param motionX The Motion X to apply to the player.
     */
    export function setMotionX(motionX: number): undefined;
    /**
     * Sets the player motion on the Y axis.
     * @param motionY The Motion Y to apply to the player.
     */
    export function setMotionY(motionY: number): undefined;
    /**
     * Sets the player motion on the Z axis.
     * @param motionZ The Motion Z to apply to the player.
     */
    export function setMotionZ(motionZ: number): undefined;
    /**
     * Clicks left mouse button.
     */
    export function leftClick(): undefined;
    /**
     * Clicks right mouse button.
     */
    export function rightClick(): undefined;
    /**
     * Attacks the target entity.
     * @param target The entity to attack.
     */
    export function attackEntity(target: EntityLiving): undefined;
    /**
     * Swings the currently held item.
     */
    export function swingItem(): undefined;
    /**
     * Silently rotates your player to a specific set of angles.
     * @param rotations Angles to rotate to.
     * @param rotationSpeed Speed to rotate at. 10 is the maximum speed. 1 section is 18 degrees per tick.
     * @param movementFix Whether to fix movement to sync with the rotations or not.
     */
    export function setRotation(rotations: Vector2, rotationSpeed: number, movementFix: boolean): undefined;
    /**
     * Silently sets a held item.
     * @param slot Hotbar slot to use.
     * @param render Whether to render the actually held item. **This argument is optional.**
     */
    export function setHeldItem(slot: number, render: boolean): undefined;
    /**
     * Returns the **serverside** held item stack.
     */
    export function getHeldItemStack(): ItemStack;
    /**
     * Returns the **clientside** held item stack.
     */
    export function getClientHeldItemStack(): ItemStack;
    /**
     * Returns the **clientside** held item slot.
     */
    export function getClientHeldItemSlot(): number;
    /**
     * Damages the player using a snowball/fishing rod/bow.
     */
    export function itemDamage(): undefined;
    /**
     * Damages the player without an item.
     * @param packet Whether to do instant damage or slow damage.
     * @param timer Timer for the slow damage. **This argument is optional and defaults to 1.**
     */
    export function damage(packet: boolean, timer: number): undefined;
    /**
     * Fake damages the player.
     */
    export function fakeDamage(): undefined;
    /**
     * Calculates rotations towards an entity / a position in the world.
     * @param to Entity or position to calculate rotations to. 
     */
    export function calculateRotations(to: Vector3 | Entity): Vector2;
    /**
     * Returns the players hurt time.
     */
    export function getHurtTime(): number;
    /**
     * Returns whether the player is using an item.
     */
    export function isUsingItem(): boolean;
    /**
     * Returns whether the player is holding a sword.
     */
    export function isHoldingSword(): boolean;
    /**
     * Returns whether the player is holding a tool.
     */
    export function isHoldingTool(): boolean;
    /**
     * Returns whether the player is holding blocks.
     */
    export function isHoldingBlock(): boolean;
    /**
     * Returns whether a player is aiming over an entity. **Also includes rotations that are set by other modules.**
     * @param entity The Entity object of a Entity you want to check. 
     * @param range The maximum distance of the entity (from the player)
     */
    export function mouseOverEntity(entity: Entity, range: Number): boolean;
}

declare namespace mc {
    /**
     * Returns `mc.displayWidth`.
     */
    export function getDisplayWidth(): number;
    /**
     * Returns `mc.displayHeight`.
     */
    export function getDisplayHeight(): number;
    /**
     * Returns `mc.timer.timerSpeed`.
     */
    export function getTimerSpeed(): number;
    /**
     * Does not return anything, sets the `timerSpeed` value of mc.timer to timerSpeed **parameter**.
     * @param timerSpeed The timer speed. Default value is 1.
     */
    export function setTimerSpeed(timerSpeed: number): undefined;
    /**
     * Returns `mc.timer.elapsedPartialTicks`.
     */
    export function getPartialTicks(): number;
    /**
     * Returns `mc.timer.renderPartialTicks`.
     */
    export function getRenderPartialTicks(): number;
}

/**
 * **This API is deprecated due to unstable implementation.** Consider using [the Packet API](https://riseclients-organization.gitbook.io/rise-6-scripting-api/api-documentation/global-namespaces/packet) instead.
 * @deprecated
 */
declare namespace network {
    /**
     * Those methods will either send a packet to the server, or force the client to receive a packet from the server.
     * Some packets might be unsupported. If the packet is not supported, **the script will throw an exception.**
     * Every valid packet should be supported.
     * @param id Packet ID. 0x03 -> C03, 0x0F -> C0F
     * @param parameters Parameters for instantiation of packet. Mismatch between packet constructor parameters and this variable argument **will cause the script throw an exception.**
     */
    export function sendPacket(id: number, ...parameters: any): undefined;
    /**
     * Those methods will either send a packet to the server, or force the client to receive a packet from the server.
     * Some packets might be unsupported. If the packet is not supported, **the script will throw an exception.**
     * Every valid packet should be supported.
     * @param id Packet ID. 0x03 -> C03, 0x0F -> C0F
     * @param parameters Parameters for instantiation of packet. Mismatch between packet constructor parameters and this variable argument **will cause the script throw an exception.**
     */
    export function receivePacket(id: number, ...parameters: any): undefined;
    /**
     * This method will return if the client is connected to the server.
     */
    export function isMultiplayer(): boolean;
    /**
     * This method will return if the client is playing in singleplayer.
     */
    export function isSingleplayer(): boolean;
    /**
     * Returns the server IP, if the player is connected to a server. Otherwise, this returns null.
     */
    export function getServerIP(): string | null;
    /**
     * Returns the server name, if the player is connected to a server. Otherwise, this returns null.
     */
    export function getServerName(): string | null;
    /**
     * Returns the server MOTD (Message Of The Day, also known as the text under a server name), if the player is connected to a server.
     */
    export function getServerMOTD(): string;
}

declare namespace packet {
    /**
     * Sends a C00 KeepAlive.
     * @param key The keepalive key.
     */
    export function sendKeepAlive(key: number): undefined;
    /**
     * Sends a C01 ChatMessage.
     * @param msg The message to send.
     */
    export function sendMessage(msg: string): undefined;
    /**
     * Sends a C02 UseEntity.
     * @param entity The entity.
     * @param action The value of C02PacketUseEntity.Action `enum` if string, hitvec otherwise.
     */
    export function sendUseEntity(entity: Entity | number, action: string | Vector3): undefined;
    /**
     * Sends a C03/C04/C06 Packet. The following method overloads exist: `sendPosition(x, y, z, ground); sendPosition(x, y, z, yaw, pitch, ground); sendPosition(ground)`
     * @param ground Whether the player is on ground. **Required parameter**
     * @param x X position. **Must be present alongside Y and Z parameters.**
     * @param y Y position. **Must be present alongside X and Z parameters.**
     * @param z Z position. **Must be present alongside X and Y parameters.**
     * @param yaw Yaw angle rotation. **Must be present alongside X, Y, Z and Pitch parameters.**
     * @param pitch Pitch angle rotation. **Must be present alongside X, Y, Z and Yaw parameters.**
     */
    export function sendPosition(ground: boolean, x?: number, y?: number, z?: number, yaw?: number, pitch?: number): undefined;
    /**
     * Sends a C07 PlayerDigging.
     * @param enumStatus The C07PacketPlayerDigging.Action `enum`.
     * @param pos Block position.
     * @param enumFacing The EnumFacing `enum` value.
     */
    export function sendDigging(enumStatus: string, pos: Vector3, enumFacing: string): undefined;
    /**
     * Sends a C08 PlayerBlockPlacement.
     * @param pos The placement position.
     * @param direction The EnumFacing index.
     * @param x Facing X.
     * @param y Facing Y.
     * @param z Facing Z.
     */
    export function sendPlacement(pos: Vector3, direction: number, x: number, y: number, z: number): undefined;
    /**
     * Sends a C09 HeldItemChange.
     * @param slot The new slot to switch to.
     */
    export function sendChangeItem(slot: number): undefined;
    /**
     * Sends a C0B EntityAction.
     * @param entityId The ID of an entity.
     * @param action The value of C0BPacketEntityAction.Action `enum`.
     */
    export function sendEntityAction(entityId: number, action: string): undefined;
    /**
     * Sends a C0C Input.
     * @param strafeSpeed The player's strafe speed.
     * @param forwardSpeed The player's forward speed.
     * @param jumping Whether the player is jumping.
     * @param sneaking Whether the player is sneaking.
     */
    export function sendInput(strafeSpeed: number, forwardSpeed: number, jumping: boolean, sneaking: boolean): undefined;
    /**
     * Sends a C0D CloseWindow.
     * @param id The window ID. **This parameter is optional.**
     */
    export function sendCloseWindow(id?: number): undefined;
    /**
     * Sends a C11 EnchantItem.
     * @param enchantment The enchantment ID.
     * @param window The window ID. **This parameter is optional.**
     */
    export function sendEnchantItem(enchantment: number, window?: number): undefined;
    /**
     * Sends a C0F ConfirmTransaction.
     * @param window The window ID.
     * @param uid The transaction ID.
     * @param accepted The transaction's `accepted` field.
     */
    export function sendTransaction(window: number, uid: number, accepted: boolean): undefined;
    /**
     * Sends a C13 PlayerAbilities. With no parameters supplied, this will send the player's current abilities.
     * @param flying Whether the player is flying. **This parameter is optional.**
     * @param allowFlying Whether the player can be flying. **This parameter is optional.**
     * @param creativeMode Whether the player is in creative. **This parameter is optional.**
     */
    export function sendAbilities(flying?: boolean, allowFlying?: boolean, creativeMode?: boolean): undefined;
    /**
     * Sends a C14 TabComplete.
     * @param msg The message.
     * @param pos The position.
     */
    export function sendTabComplete(msg: string, pos: Vector3): undefined;
    /**
     * Sends a C16 ClientStatus.
     * @param status The value of C16PacketClientStatus.EnumState
     */
    export function sendStatus(status: string): undefined;
    /**
     * Sends a C15 ClientSettings.
     */
    export function sendSettings(): undefined;
}

export {
    script,
    render,
    input,
    world,
    rise,
    player,
    mc,
    network,
    packet
}