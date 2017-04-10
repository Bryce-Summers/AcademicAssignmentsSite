/*
 * Drawing Controller.
 *
 * Written by Bryce Summers on 4.4.2017
 * 
 * This class is responsible for clearing the screen and drawing the graph.
 */

// SCRIB.PolylingPostProcessor, SCRIB.G_Graph
function Controller_Draw(postProcessor, graphics)
{
    // The circle that follows the mouse.
    
    // Used for executing the algorithmic commands.
    this.postProcessor = postProcessor;

    // SCRIB.G_Graphs object, a BDS.G_Canvas may be retrieved from within it.
    this._G_graph  = graphics;
    this._G_canvas = graphics.getLowerG();

    this._active = true;
}

Controller_Draw.prototype =
{

    setActive(isActive)
    {
        this._active = isActive;
    },

    isActive()
    {
        return this._active;
    },

    mouse_down(event)
    {
    },

    mouse_up(event)
    {
    },

    // Maybe I can put in some feedback here, such as the face that the mouse is in,
    // but for now I'll allow for the tools to do that.
    mouse_move(event)
    {
    },

    // Difference in time between the previous call and this call.
    time(dt)
    {
        // Clear the screen for new drawing.
        this._G_canvas.clearScreen();

        this._G_canvas.drawImage(this.img_timeline, 32, 0);

    },

    window_resize(event)
    {

    },

    // Sorts faces from greatest to least area.
    sortFaces(faces)
    {
        var array = [];
        for(var i = 0; i < faces.length; i++)
        {
            var face = faces[i];
            var polyline = face.polyline;
            var area = polyline.computeArea();

            associated_tuple = {key: face, value:-area};
            array.push(associated_tuple);
        }

        // Sorts a list of objects with .value defined by .value in asending order.
        BDS.Arrays.sortByValue(array);

        this.faces = [];

        for(var i = 0; i < array.length; i++)
        {
            this.faces.push(array[i].key);
        }
    },

}
