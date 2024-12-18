     // Set window height and width variables
     let width = window.innerWidth,
     height = window.innerHeight;
 
   const audio = document.querySelectorAll("audio");
 
   // This project uses Matter so load in the modules as necessary
   var Engine = Matter.Engine,
     Render = Matter.Render,
     World = Matter.World,
     Mouse = Matter.Mouse,
     Body = Matter.Body,
     Bodies = Matter.Bodies,
     Vertices = Matter.Vertices,
     Constraint = Matter.Constraint,
     Composite = Matter.Composite;
 
   // Create an engine
   var engine = Engine.create();
 
   // Create a renderer
   var render = Render.create({
     element: document.body,
     engine: engine,
     options: {
       showAngleIndicator: false,
       wireframes: false,
       background: "#f6f6f6",
       width: width,
       height: height,
       showAngleIndicator: false,
       showCollisions: false,
       showInternalEdges: false,
       showVelocity: false
     }
   });
 
   // Add container walls
   World.add(engine.world, [
     Bodies.rectangle(width / 2, height + 30, width, 60, {
       label: "ground",
       isStatic: true
     }),
     Bodies.rectangle(-30, height / 2, 60, height * 4, {
       label: "left-wall",
       isStatic: true
     }),
     Bodies.rectangle(width + 30, height / 2, 60, height * 4, {
       label: "right-wall",
       isStatic: true
     })
   ]);
 
   // Define the corn shape with a set of coordinates
   let cornSet = [
     { x: 9.006618, y: 13.010806 },
     { x: 10.698117, y: 10.06409 },
     { x: 9.065259, y: 3.235077 },
     { x: 7.587805, y: 1.178564 },
     { x: 5.419502, y: 0.144841 },
     { x: 3.324593, y: 1.059169 },
     { x: 1.773746, y: 3.235077 },
     { x: 0.140884, y: 10.064096 },
     { x: 1.832385, y: 13.010806 },
     { x: 5.419502, y: 13.741506 }
   ];
 
   // Increase the scale of the corn
   cornSet = Vertices.scale(cornSet, 3, 3);
 
   // Track number of corn dropped and corn popped
   let cornDropped = 0;
   let cornPopped = 0;
   // Define the function to create a single grain of corn
   const corn = function() {
     // Corn colours
     let corn0 = "#e28a27";
     let corn1 = "#ea9d20";
     // Add a random spin to the corn
     let spin = Math.random() * 0.4 - 0.2;
     // Start colour for the corn
     let color = corn0;
     // If the number is divisible by 2 then change the appearance
     if (cornDropped % 2 === 0) {
       color = corn1;
     }
     // Increase the number of corn dropped
     cornDropped++;
     // Create a new grain of corn
     return Bodies.fromVertices(
       width / 2,
       -80,
       cornSet,
       {
         label: "corn",
         // Add some elasticity
         restitution: 0.8,
         friction: 0.05,
         torque: spin,
         render: {
           fillStyle: color,
           strokeStyle: color
         }
       },
       true
     );
   };
 
   // Define the function to create popcorn
   function makePopcorn(x, y) {
     // Popcorn colours
     let popcorn0 = "#f9e7a4";
     let popcorn1 = "#f1dda6";
     let color = popcorn0;
     // If the number is divisible by 2 then change the appearance
     if (cornPopped % 2 === 0) {
       color = popcorn1;
     }
     var options = {
       render: {
         fillStyle: color,
         strokeStyle: color
       }
     };
     // Give the popped corn random sizes
     function randomSize(base) {
       return Math.floor(Math.random() * base) + base;
     }
     // Offset each part of the popcorn by a random amount
     function randomOffset() {
       return Math.ceil(Math.random() * 2);
     }
     // Add a random force to popcorn when it is created
     function randomForce() {
       return Math.random() * 2 - 1;
     }
     // Save each random size as a separate value for later reference
     const topSize = randomSize(18);
     const leftSize = randomSize(18);
     const rightSize = randomSize(18);
     const mainSize = randomSize(20);
 
     const offset = mainSize / 4;
     // Create new circles based on the randomised values
     const top = Bodies.circle(
       x,
       y - (topSize / randomOffset() + offset),
       topSize,
       options
     );
     const main = Bodies.circle(x, y, mainSize, options);
     const right = Bodies.circle(
       x + (rightSize / randomOffset() + offset),
       y - rightSize / randomOffset(),
       rightSize,
       options
     );
     const left = Bodies.circle(
       x - (leftSize / randomOffset() + offset),
       y - leftSize / randomOffset(),
       leftSize,
       options
     );
 
     let spin = Math.random() * 0.4 - 0.2;
     let forceX = randomForce();
     let forceY = randomForce();
     // Create the popcorn
     var popcorn = Body.create({
       parts: [main, top, left, right],
       label: "popcorn",
       torque: spin,
       force: { x: forceX, y: forceY }
     });
 
     // Increase number of corn popped
     cornPopped++;
     // Send the new popcorn to the world
     return popcorn;
   }
 
   // Create an influencer which will be used to pop the corn
   const influencer = Bodies.circle(width / 2, height / 2, 10, {
     label: "popper",
     isStatic: true,
     restitution: 1,
     friction: 0.05,
     render: {
       // Make it invisible
       visible: false
     }
   });
 
   // Add the influencer to the world
   World.add(engine.world, influencer);
 
   // Add a mouse controller
   const mouse = Mouse.create(render.canvas);
 
   // Define what happens when the mouse moves
   Matter.Events.on(engine, "afterUpdate", function() {
     // Early exit condition
     if (!mouse.position.x) {
       return;
     }
     const offset1 = {
       x: 0,
       y: 0
     };
     const offset2 = {
       x: 0,
       y: 0
     };
     // Smoothly move the influencer towards the mouse position
     Body.translate(influencer, {
       x: (mouse.position.x - influencer.position.x - offset1.x) * 0.3,
       y: (mouse.position.y - influencer.position.y + offset1.y) * 0.3
     });
   });
 
   // Create a collision event for when the mouse iteracts with the corn
   Matter.Events.on(engine, "collisionStart", function(event) {
     let pairs = event.pairs;
     pairs.forEach(function(pair) {
       // Check if the collision is between the corn and the "popper" of the corn
       if (pair.bodyB.label === "corn" && pair.bodyA.label === "popper") {
         // Remove the corn from the world
         World.remove(engine.world, pair.bodyB.parent, [(deep = true)]);
         // Store the exit point for where the corn is removed from
         const xPos = pair.bodyB.parent.position.x;
         const yPos = pair.bodyB.parent.position.y;
         // Add a popcorn in its place using the exit point variables
         let choice = Math.round(Math.random() * (audio.length - 1));
         audio[choice].currentTime = 0; //reset sound
         audio[choice].play();
         World.add(engine.world, makePopcorn(xPos, yPos));
       }
     });
   });
 
   // Start the addCorn as true so that it can be switched into a interval function later
   let addCorn = true;
 
   //Global variable to track the mouse down interval
   let mouseDown = -1;
 
   // Define the function for what should happen when the mouse is down
   function onMouseDown() {
     // Early return if too much corn has been dropped
     if (cornDropped > 100) {
       return;
     } else {
       // Otherwise add new corn to the world
       World.add(engine.world, corn());
     }
   }
 
   function start() {
     if (mouseDown == -1) {
       //Prevent multiple loops!
       // And run the function at a regular interval
       mouseDown = setInterval(onMouseDown, 200);
     }
   }
 
   function end() {
     // Change the variable to stop new items from being added
     if (mouseDown != -1) {
       // Only stop if it exists
       clearInterval(mouseDown);
       // Set the default value to allow it to be triggered again
       mouseDown = -1;
     }
   }
 
   // If the mouse is down
   window.addEventListener("mousedown", start);
 
   // When the mouse button is up
   window.addEventListener("mouseup", end);
 
   document.addEventListener("touchstart", function(e) {
     e.preventDefault();
     start();
   });
 
   document.addEventListener("touchend", function(e) {
     end();
   });
 
   // Run the engine
   Engine.run(engine);
 
   // Run the renderer
   Render.run(render);
 
   // When the document has loaded
   document.addEventListener("DOMContentLoaded", function(event) {
     // Add a maximum of 10 corn in the beginning
     const startMax = 10;
     // Start an interval for adding corn
     addCorn = setInterval(function() {
       // Count whether the maximum number of corn has been added
       if (cornDropped > startMax) {
         // If so then clear the interval
         clearInterval(addCorn);
         // Don't add any more corn!
         addCorn = false;
         // Exit the function
         return;
       }
       // If the function is still running then add a new corn
       World.add(engine.world, corn());
     }, 200);
   });
  
  // 월드에 MouseConstraint 추가
  World.add(engine.world, mouseConstraint);

  