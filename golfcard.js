
var numOfCellsPerRow = 22;
var numOfHoles = 18;

var courseData;


function buildTableContainer()
{
    var tableContainer = document.createElement("div");
    tableContainer.id = "tableContainer";
    $("body").append(tableContainer);
    $("#tableContainer").css("width", "1000px"); // This width turned out to be perfect, I think.
}

function buildTableRow(rowID)
{
    var rowContainer = document.createElement("div");
    rowContainer.className = "rowContainer";
    $("#tableContainer").append(rowContainer);
    $(".rowContainer").css("height", "30px");
    $(".rowContainer").css("width", "100%");


    for (var i = 0; i < numOfCellsPerRow; i++)
    {


        if(i === 0)
        {
            var rowTitleCell = document.createElement("div");
            rowTitleCell.id = rowID + "TitleCell";
            rowTitleCell.className = "rowTitleCell";
            rowContainer.appendChild(rowTitleCell);
            $(".rowTitleCell").addClass("tableCell");
            $(".rowTitleCell").css("width", "15%");
        }
        else if(i === 10 || i === 20)
        {
            if(i === 10)
            {
                var outCell = document.createElement("div");
                outCell.id = rowID + "OutCell";
                outCell.className = "outCell";
                rowContainer.appendChild(outCell);
                $(".outCell").addClass("halfTotalCell");
            }
            else
            {
                var inCell = document.createElement("div");
                inCell.id = rowID + "InCell";
                inCell.className = "inCell";
                rowContainer.appendChild(inCell);
                $(".inCell").addClass("halfTotalCell");
            }

            $(".halfTotalCell").addClass("tableCell");
            $(".halfTotalCell").css("width", "6%");
            $(".halfTotalCell").css("text-align", "center");
        }

        else if(i === 21)
        {
            var grandTotalCell = document.createElement("div");
            grandTotalCell.id = rowID + "GrandTotalCell";
            grandTotalCell.className = "grandTotalCell";
            rowContainer.appendChild(grandTotalCell);
            $(".grandTotalCell").addClass("tableCell");
            $(".grandTotalCell").css("width", "9%");
            $(".grandTotalCell").css("text-align", "center");
        }
        else
        {
            var holeCell = document.createElement("div");
            if(i < 10)
            {
                holeCell.id = rowID + "HoleCell" + i;
                holeCell.className = "holeCell" + i;
                rowContainer.appendChild(holeCell);
                $(".holeCell" + i).addClass("tableCell");
                $(".holeCell" + i).css("width", "3%");
                $(".holeCell" + i).css("text-align", "center");
            }
            else
            {
                var h = i - 1;
                holeCell.id = rowID + "HoleCell" + h;
                holeCell.className = "holeCell" + h;
                rowContainer.appendChild(holeCell);
                $(".holeCell" + h).addClass("tableCell");
                $(".holeCell" + h).css("width", "3%");
                $(".holeCell" + h).css("text-align", "center");
            }
        }



        $(".tableCell").css("border", "solid blue 1px");
        $(".tableCell").css("color", "blue");
        $(".tableCell").css("height", "100%");
        $(".tableCell").css("padding", "0");

        //These four lines aren't working:
        $(".tableCell").addClass("col-xs-12");
        $(".tableCell").addClass("col-sm-8");
        $(".tableCell").addClass("col-md-4");
        $(".tableCell").addClass("col-lg-1");

    }


    $("#tableContainer").css("margin", "0 auto");
}


function buildHeaderRow()
{
    buildTableRow("header");
    

    $("#headerTitleCell").text("Hole");
    $("#headerOutCell").text("Out");
    $("#headerInCell").text("In");
    $("#headerGrandTotalCell").text("Total");

    for (var i = 1; i <= numOfHoles; i++)
    {
        $("#headerHoleCell" + i).text(i);
    }


}

function buildParRow()
{


    var outNumber = 0;
    var inNumber = 0;
    var totalNumber = 0;
    var parNumbers = [];

    buildTableRow("parRow");


    $("#parRowTitleCell").text("Par");

    for (var i = 1; i <= numOfHoles; i++)
    {
        var h = i - 1;
        
        if (typeof courseData != 'undefined')
        {
            parNumbers[h] = courseData.course.holes[h].tee_boxes[3].par;
            $("#parRowHoleCell" + i).text(parNumbers[h]);
            if (i <= 9) 
            {
                outNumber = outNumber + parNumbers[h];
            }
            else
            {
                inNumber =  inNumber + parNumbers[h];
            }
            totalNumber = totalNumber + parNumbers[h];
        }
    }

    $("#parRowOutCell").text(outNumber);
    $("#parRowInCell").text(inNumber);
    $("#parRowGrandTotalCell").text(totalNumber);


}

function buildYardageRow()
{
    var outNumber = 0;
    var inNumber = 0;
    var totalNumber = 0;
    var yardNumbers = [];

    buildTableRow("yardageRow");


    $("#yardageRowTitleCell").text("Yards");

    for (var i = 1; i <= numOfHoles; i++)
    {
        var h = i - 1;

        if (typeof courseData != 'undefined')
        {
            yardNumbers[h] = courseData.course.holes[h].tee_boxes[3].yards;

            $("#yardageRowHoleCell" + i).text(yardNumbers[h]);
            if (i <= 9)
            {
                outNumber = outNumber + yardNumbers[h];
            }
            else
            {
                inNumber =  inNumber + yardNumbers[h];
            }
            totalNumber = totalNumber + yardNumbers[h];
        }
    }

    $("#yardageRowOutCell").text(outNumber);
    $("#yardageRowInCell").text(inNumber);
    $("#yardageRowGrandTotalCell").text(totalNumber);
}

function buildHandicapRow()
{
    var outNumber = 0;
    var inNumber = 0;
    var totalNumber = 0;
    var handicapNumbers = [];

    buildTableRow("handicapRow");


    $("#handicapRowTitleCell").text("Handicap");

    for (var i = 1; i <= numOfHoles; i++)
    {
        var h = i - 1;

        if (typeof courseData != 'undefined')
        {
            handicapNumbers[h] = courseData.course.holes[h].tee_boxes[3].hcp;

            $("#handicapRowHoleCell" + i).text(handicapNumbers[h]);
            if (i <= 9)
            {
                outNumber = outNumber + handicapNumbers[h];
            }
            else
            {
                inNumber =  inNumber + handicapNumbers[h];
            }
            totalNumber = totalNumber + handicapNumbers[h];
        }
    }

    $("#handicapRowOutCell").text(outNumber);
    $("#handicapRowInCell").text(inNumber);
    $("#handicapRowGrandTotalCell").text(totalNumber);
}


function getCourseAndBuildCourseDataRows(id)
{
    var xHttpRequest = new XMLHttpRequest();
    xHttpRequest.onreadystatechange = function () {
        if (xHttpRequest.readyState == XMLHttpRequest.DONE && xHttpRequest.status == 200)
        {
            courseData = JSON.parse(xHttpRequest.responseText);
            buildParRow();
            buildYardageRow();
            buildTableRow();
            buildTableRow();
            buildHandicapRow();
        }
    };

    xHttpRequest.open("GET", "http://golf-courses-api.herokuapp.com/courses/" + id, true);
    var body =
        {
            "latitude": 40.3902939,
            "longitude": -111.8325893,
            "radius": 10
        };
    xHttpRequest.send(JSON.stringify(body));
}


function executeJS()
{
    buildTableContainer();
    buildHeaderRow();
    getCourseAndBuildCourseDataRows("18300");
    // buildParRow();
}

