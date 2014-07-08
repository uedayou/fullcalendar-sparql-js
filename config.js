var endpoint = "http://archive.yafjp.org/test/inspection.php";
var query = (function () {/*
PREFIX dc: <http://purl.org/dc/elements/1.1/> 
PREFIX schema: <http://schema.org/> 
PREFIX event: <http://fp.yafjp.org/terms/event#> 
SELECT * WHERE{
  ?uri a event:Event;
  schema:name ?title;
  schema:startDate ?start;
  schema:endDate ?end;
  dc:description ?description.
} 
*/}).toString().match(/\n([\s\S]*)\n/)[1];

var labelTitle = "title";
var labelStartDate = "start";
var labelEndDate = "end";
var allDayFlag = true;
var now = moment().format("YYYY-MM-DDTHH:mm:ss+09:00");
var colors = ["limegreen", "gray", "purple", "darkblue", "green", "darkorange", "darkcyan", "brown", "lightseagreen"];
