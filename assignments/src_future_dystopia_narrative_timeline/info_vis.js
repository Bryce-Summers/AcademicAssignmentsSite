/*
 * Vector Graphics Editor example
 * Written by Bryce Summers on 4 - 3 - 2017.
 * Purpose: Demonstrates Combining Tools with a Graphic User Interface.
 */

// Small Example scope.
function main()
{
    var canvas = document.getElementById("theCanvas");
    var canvas_G = new BDS.G_Canvas(canvas);
    var graph_G  = new SCRIB.G_Graphs(canvas_G);

    // Embed the polylines within a graph.
    var embedder = new SCRIB.PolylineGraphEmbedder();

    var line1 = new BDS.Polyline(false,
         [
            new BDS.Point(150, 150),
            new BDS.Point(350, 152),
            new BDS.Point(320, 352),
            new BDS.Point(150, 350),
            new BDS.Point(170, 120)
         ],
         true);

    var line2 = new BDS.Polyline(false,
         [
            new BDS.Point(250, 230),
            new BDS.Point(450, 231),
            new BDS.Point(420, 432),
            new BDS.Point(250, 430),
            new BDS.Point(270, 200)
         ],
         true);

    // We start with an empty graph.
    var graph    = embedder.embedPolylineArray([line1, line2]);

    // The Post Processor eats graphs for breakfast and provides
    // algorithmic modification function that will be used in the various editor tools.
    var postProcessor = new SCRIB.PolylineGraphPostProcessor();
    postProcessor.load_graph(graph);
    postProcessor.generateBVH();

    // FIXME: Think about optimizing the generation of face data structures across tools.

    // -- User Input.

    // Initialize the root Input controller.
    var root_input = init_input(false);


    var controller_draw         = new Controller_Draw(postProcessor, graph_G);
    var controller_ui           = new BDS.Controller_UI(canvas_G);

    // -- Tools Controllers.
    var controller_eraser       = new Controller_Eraser(postProcessor, graph_G);
    controller_eraser.setActive(false);
    var controller_line_drawing = new Controller_NewLine(postProcessor, graph_G);
    controller_line_drawing.setActive(false);

    // -- Tools UI.
    var b1 = new BDS.Box(new BDS.Point(0,   0),
                         new BDS.Point(64, 64));

    var b2 = new BDS.Box(new BDS.Point(96,   0),
                         new BDS.Point(96 + 64, 64));
    var b3 = new BDS.Box(new BDS.Point(96*2,   0),
                         new BDS.Point(96*2 + 64, 64));

    var b4 = new BDS.Box(new BDS.Point(96*3,   0),
                         new BDS.Point(96*3 + 64, 64));

    var p1 = b1.toPolyline();
    var p2 = b2.toPolyline();
    var p3 = b3.toPolyline();
    var p4 = b4.toPolyline();

    
    var header       = document.getElementById("narrative_timeline_heading");
    //var instructions = document.getElementById("instructions");

    var section_1960 = document.getElementById("section_1960");
    var section_2017 = document.getElementById("section_2017");
    var section_2100 = document.getElementById("section_2100");
    var section_2200 = document.getElementById("section_2200");

    function func_1960()
    {
        section_1960.style.display = 'none';
        section_2017.style.display = 'none';
        section_2100.style.display = 'none';
        section_2200.style.display = 'none';

        section_1960.style.display = 'block';

        header.innerHTML   = "1960 - Singing of Modernity";
    }

    function func_2017()
    {
        section_1960.style.display = 'none';
        section_2017.style.display = 'none';
        section_2100.style.display = 'none';
        section_2200.style.display = 'none';

        section_2017.style.display = 'block';

        header.innerHTML   = "2017 - The Academic Arms Race";
    }

    function func_2100()
    {

        section_1960.style.display = 'none';
        section_2017.style.display = 'none';
        section_2100.style.display = 'none';
        section_2200.style.display = 'none';

        section_2100.style.display = 'block';

        header.innerHTML   = "2100 - Awards for 100 year careers.";
    }

    function func_2200()
    {
        section_1960.style.display = 'none';
        section_2017.style.display = 'none';
        section_2100.style.display = 'none';
        section_2200.style.display = 'none';

        section_2200.style.display = 'block';

        header.innerHTML   = "2200 - Competitive Tombstone Engravings";
    }

    var img_1960 = document.getElementById("1960");
    var img_2017 = document.getElementById("2017");
    var img_2100 = document.getElementById("2100");
    var img_2200 = document.getElementById("2200");
    var img_timeline = document.getElementById("time_line");

    controller_draw.img_timeline = img_timeline;

    img_1960.style.display = 'none';
    img_2017.style.display = 'none';
    img_2100.style.display = 'none';
    img_2200.style.display = 'none';
    img_timeline.style.display = 'none';


    // We put the line drawing button first to encourage people to use it.
    controller_ui.createButton(p1, func_1960, img_1960);
    controller_ui.createButton(p2, func_2017, img_2017);
    controller_ui.createButton(p3, func_2100, img_2100);
    controller_ui.createButton(p4, func_2200, img_2200);


    // Layer 1: Clear the screen and draw the graph.
    root_input.add_universal_controller(controller_draw);

    // Layer 2: Tool's
    root_input.add_universal_controller(controller_eraser);
    root_input.add_universal_controller(controller_line_drawing);

    // Layer 3: User Interface.
    root_input.add_universal_controller(controller_ui);

    // Begin the Amazing Experience!
    beginTime();
}

// Run Example.
window.onload = function()
{
    main();
}