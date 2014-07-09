# FullCalendar SPARQL

[FullCalendar] でSPARQLエンドポイントを使えるようにしました。

## デモ

<http://uedayou.net/fullcalendar-sparql-js/>

## 使い方

config.js の endpoint に SPARQLエンドポイントを、query に SPARQLクエリを入力してください。
queryは、/* ... */ の中に記述してください。

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

SPARQLクエリは、イベントやスケジュールの名前を ?titleに、開始日時を ?start、終了日時を ?end に入れるようにしてください。

SPARQLクエリ内で現在の日時を使う場合は、{% now %} をクエリ内を記述すると、現在の日時(xsd:dateTime型)に置き換わります。

たとえば、

	filter(?end>="{% now %}"^^xsd:dateTime).

と記述すると、SPARQLエンドポイントへクエリを送信する際に

	filter(?end>="2014-07-07T12:00:00+09:00"^^xsd:dateTime).

のように置き換わります。

SPARQLエンドポイントは、CORS(Cross-Origin Resource Sharing)に対応したもののみ利用できます。

※ config.js に記述されているSPARQLエンドポイントとクエリはサンプルです。このままではカレンダーを表示できません。SPARQLエンドポイントとクエリを書き換えて利用してください。

## 利用ライブラリ

- [FullCalendar]
- [jQuery]
- [Bootstrap]
- [bootstrap-modal]
- [SPARQL Timeliner]

## ライセンス

Copyright &copy; 2014 Hiroshi Ueda([@uedayou]). Licensed under the [MIT license][mit].

[FullCalendar]:http://arshaw.com/fullcalendar/
[jQuery]:http://jquery.com/
[Bootstrap]:http://getbootstrap.com/
[bootstrap-modal]:https://github.com/jschr/bootstrap-modal
[SPARQL Timeliner]:http://uedayou.net/SPARQLTimeliner/
[MIT]: http://www.opensource.org/licenses/mit-license.php
[@uedayou]:https://twitter.com/uedayou