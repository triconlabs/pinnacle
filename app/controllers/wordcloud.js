import Ember from 'ember';

export default Ember.Controller.extend({
    cloud: Ember.inject.service('cloud'),
    typeFace: 'Gorditas',
    minFontSize: 24,
    words: null,

    actions: {
        runCloudCode: function() {
            var freqlist = [];
            var self = this;
            var height = 600;
            var width = 600;
            this.get('cloud').run('hello', {})
                .then((ratings) => {
                    console.log("ccccccccccccccccccccc");
                    console.log(ratings);
                    ratings = ratings.result;
                    console.log(Object.keys(ratings));
                    for (var key in ratings) {
                        freqlist.push({
                            "text": key,
                            "size": ratings[key]
                        })


                    };
                    var preqlist = Object.keys(ratings).map(function(d) {
                        return {
                            text: d,
                            size: ratings[d] * 15
                        };
                    })


                    //  self.set('words', freqlist);
                    // self.send('calculateCloud');
                    var fill = d3.scale.category20();

                    d3.layout.cloud().size([width, height])
                        .words(preqlist)
                        .rotate(function(d) {
                            return 0;
                        })
                        //   .font("Impact")
                        .fontSize(function(d) {
                            return d.size;
                        })
                        .text(function(d) {
                            return d.text;
                        })
                        .on("end", draw)
                        .start();

                    function draw(words) {
                        console.log(preqlist);
                        d3.select(".main").append("svg")
                            .attr("width", width)
                            .attr("height", height)
                            .append("g")
                            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
                            .selectAll("text")
                            .data(words)
                            .enter().append("text")
                            .style("font-size", function(d) {
                                return d.size + "px";
                            })
                            //   .style("font-family", "Impact")
                            .style("fill", function(d, i) {
                                return fill(i);
                            })
                            .attr("text-anchor", "middle")
                            .attr("transform", function(d) {
                                return "translate(" + [d.x + 10, d.y + 10] + ")rotate(" + d.rotate + ")";
                            })
                            .text(function(d) {
                                return d.text;
                            });
                    }
                });

        },
        calculateCloud: function(argument) {


        },

        drawCloud: function() {

        },
        animatedGenderplot: function() {

            var DURATION = 500,
                DEALY = 200,
                elementId = 'pieChart';
            var data =  [{
                    color: 'red',
                    description: 'Ipsem lorem text goes here. And foo goes bar goes baz. That\'s up!!!',
                    title: 'flowers',
                    value: 0.7
                }, {
                    color: 'blue',
                    description: 'Another ipsem text goes here. And baz goes bar goes foo. Oh yeah, whazzz up?',
                    title: 'trains',
                    value: 0.3
                }];
            
            // TODO code duplication check how you can avoid that
            var containerEl = document.getElementById(elementId),
                width = containerEl.clientWidth,
                height = width * 0.4,
                radius = Math.min(width, height) / 2,
                container = d3.select(containerEl),
                svg = container.select('svg')
                .attr('width', width)
                .attr('height', height);
            var pie = svg.append('g')
                .attr(
                    'transform',
                    'translate(' + width / 2 + ',' + height / 2 + ')'
                );

            var detailedInfo = svg.append('g')
                .attr('class', 'pieChart--detailedInformation');

            var twoPi = 2 * Math.PI;
            var pieData = d3.layout.pie()
                .value(function(d) {
                    return d.value;
                });

            var arc = d3.svg.arc()
                .outerRadius(radius - 20)
                .innerRadius(radius - 70);

            var pieChartPieces = pie.datum(data)
                .selectAll('path')
                .data(pieData)
                .enter()
                .append('path')
                .attr('class', function(d) {
                    return 'pieChart__' + d.data.color;
                })
                .attr('filter', 'url(#pieChartInsetShadow)')
                .attr('d', arc)
                .each(function() {
                    this._current = {
                        startAngle: 0,
                        endAngle: 0
                    };
                })
                .transition()
                .duration(DURATION)
                .attrTween('d', function(d) {
                    var interpolate = d3.interpolate(this._current, d);
                    this._current = interpolate(0);

                    return function(t) {
                        return arc(interpolate(t));
                    };
                })
                .each('end', function handleAnimationEnd(d) {

                });


        }
    }
});
