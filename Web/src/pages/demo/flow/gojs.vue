<template>
	<div>
		<div id="myDiagramDiv" style="background-color: #696969; border: solid 1px black; height: 500px"></div>
	</div>
</template>

<script>
	import gojs from "@/static/js/importGojs.js";
	export default {
		name: "Gojs",
		data() {
			return {
				data: {
					"class": "go.TreeModel",
					"nodeDataArray": [{
							"key": 1,
							"name": "Stella Payne Diaz",
							"title": "CEO"
						},
						{
							"key": 2,
							"name": "Luke Warm",
							"title": "VP Marketing/Sales",
							"parent": 1
						},
						{
							"key": 3,
							"name": "Meg Meehan Hoffa",
							"title": "Sales",
							"parent": 2
						},
						{
							"key": 4,
							"name": "Peggy Flaming",
							"title": "VP Engineering",
							"parent": 1
						},
						{
							"key": 5,
							"name": "Saul Wellingood",
							"title": "Manufacturing",
							"parent": 4
						},
						{
							"key": 6,
							"name": "Al Ligori",
							"title": "Marketing",
							"parent": 2
						},
						{
							"key": 7,
							"name": "Dot Stubadd",
							"title": "Sales Rep",
							"parent": 3
						},
						{
							"key": 8,
							"name": "Les Ismore",
							"title": "Project Mgr",
							"parent": 5
						},
						{
							"key": 9,
							"name": "April Lynn Parris",
							"title": "Events Mgr",
							"parent": 6
						},
						{
							"key": 10,
							"name": "Xavier Breath",
							"title": "Engineering",
							"parent": 4
						},
						{
							"key": 11,
							"name": "Anita Hammer",
							"title": "Process",
							"parent": 5
						},
						{
							"key": 12,
							"name": "Billy Aiken",
							"title": "Software",
							"parent": 10
						},
						{
							"key": 13,
							"name": "Stan Wellback",
							"title": "Testing",
							"parent": 10
						},
						{
							"key": 14,
							"name": "Marge Innovera",
							"title": "Hardware",
							"parent": 10
						},
						{
							"key": 15,
							"name": "Evan Elpus",
							"title": "Quality",
							"parent": 5
						},
						{
							"key": 16,
							"name": "Lotta B. Essen",
							"title": "Sales Rep",
							"parent": 3
						}
					]
				}
			}
		},
		methods: {
			init() {
				var $ = go.GraphObject.make; // for conciseness in defining templates

				var myDiagram = $(go.Diagram, "myDiagramDiv", // must be the ID or reference to div
					{
						initialContentAlignment: go.Spot.Center,
						maxSelectionCount: 1, // users can select only one part at a time
						layout: $(go.TreeLayout, {
							treeStyle: go.TreeLayout.StyleLastParents,
							arrangement: go.TreeLayout.ArrangementHorizontal,
							// properties for most of the tree:
							angle: 90,
							layerSpacing: 35,
							// properties for the "last parents":
							alternateAngle: 90,
							alternateLayerSpacing: 35,
							alternateAlignment: go.TreeLayout.AlignmentBus,
							alternateNodeSpacing: 20
						}),
						"undoManager.isEnabled": true // enable undo & redo
					});

				var levelColors = ["#AC193D", "#2672EC", "#8C0095", "#5133AB",
					"#008299", "#D24726", "#008A00", "#094AB2"
				];

				// override TreeLayout.commitNodes to also modify the background brush based on the tree depth level
				myDiagram.layout.commitNodes = function() {
					go.TreeLayout.prototype.commitNodes.call(myDiagram.layout); // do the standard behavior
					// then go through all of the vertexes and set their corresponding node's Shape.fill
					// to a brush dependent on the TreeVertex.level value
					myDiagram.layout.network.vertexes.each(function(v) {
						if(v.node) {
							var level = v.level % (levelColors.length);
							var color = levelColors[level];
							var shape = v.node.findObject("SHAPE");
							if(shape) shape.fill = $(go.Brush, "Linear", {
								0: color,
								//1: go.Brush.lightenBy(color, 0.05),
								start: go.Spot.Left,
								end: go.Spot.Right
							});
						}
					});
				};

				// This function provides a common style for most of the TextBlocks.
				// Some of these values may be overridden in a particular TextBlock.
				function textStyle() {
					return {
						font: "9pt  Segoe UI,sans-serif",
						stroke: "white"
					};
				}

				// This converter is used by the Picture.
				/*function findHeadShot(key) {
					return require("./index-meinv.jpg");

				}*/

				// define the Node template
				myDiagram.nodeTemplate =
					$(go.Node, "Auto",
						new go.Binding("text", "name"),
						$(go.Shape, "Rectangle", {
							name: "SHAPE",
							fill: "white",
							stroke: null,
							// set the port properties:
							portId: "",
							fromLinkable: false,
							toLinkable: false,
							cursor: "pointer"
						}),
						$(go.Panel, "Horizontal",
							$(go.Picture, {
									name: "Picture",
									desiredSize: new go.Size(39, 50),
									margin: new go.Margin(6, 8, 6, 10),
								},
								new go.Binding("source", "key", function() {
									return require("./index-meinv.jpg");
								})),
							// define the panel where the text will appear
							$(go.Panel, "Table", {
									maxSize: new go.Size(150, 999),
									margin: new go.Margin(6, 10, 0, 3),
									defaultAlignment: go.Spot.Left
								},
								$(go.RowColumnDefinition, {
									column: 2,
									width: 4
								}),

								$(go.TextBlock, textStyle(), // the name
									{
										row: 0,
										column: 0,
										columnSpan: 5,
										font: "12pt Segoe UI,sans-serif",
										editable: false,
										isMultiline: false,
										minSize: new go.Size(10, 16)
									},
									new go.Binding("text", "name").makeTwoWay()),

								$(go.TextBlock, "Title: ", textStyle(), { //title
									row: 1,
									column: 0
								}),
								$(go.TextBlock, textStyle(), {
										row: 1,
										column: 1,
										columnSpan: 4,
										editable: false,
										isMultiline: false,
										minSize: new go.Size(10, 14),
										margin: new go.Margin(0, 0, 0, 3)
									},
									new go.Binding("text", "title").makeTwoWay()),

								$(go.TextBlock, textStyle(), { //id
										row: 2,
										column: 0
									},
									new go.Binding("text", "key", function(v) {
										return "ID: " + v;
									})),

								$(go.TextBlock, textStyle(), { //boss

										name: "boss",
										row: 2,
										column: 3,
									}, // we include a name so we can access this TextBlock when deleting Nodes/Links

									new go.Binding("text", "parent", function(v) {
										return "Boss: " + v;
									})),

								$(go.TextBlock, textStyle(), // the comments
									{
										row: 3,
										column: 0,
										columnSpan: 5,
										font: "italic 9pt sans-serif",
										wrap: go.TextBlock.WrapFit,
										editable: false, // by default newlines are allowed
										minSize: new go.Size(10, 14)
									},
									new go.Binding("text", "comments").makeTwoWay())
							) // end Table Panel
						) // end Horizontal Panel
					); // end Node

				// define the Link template
				myDiagram.linkTemplate =
					$(go.Link, go.Link.Orthogonal, {
							corner: 5,
							relinkableFrom: true,
							relinkableTo: true
						},
						$(go.Shape, {
							strokeWidth: 4,
							stroke: "#00a4a4"
						})); // the link shape

				//init data
				myDiagram.model = go.Model.fromJson(this.data);

			}
		},
		mounted() {
			gojs.init(() => {
				this.init();
			})
		}
	}
</script>

<style>

</style>