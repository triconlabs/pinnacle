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
                            size: ratings[d]*15
                        };
                    })


                    //  self.set('words', freqlist);
                    // self.send('calculateCloud');
                    var fill = d3.scale.category20();

                    d3.layout.cloud().size([width, height])
                        .words(preqlist)
                        .rotate(function(d) { return 0; })
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
                            .attr("transform", "translate("+width/2+","+height/2+")")
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
                                return "translate(" + [d.x+10, d.y+10] + ")rotate(" + d.rotate + ")";
                            })
                            .text(function(d) {
                                return d.text;
                            });
                    }
                });

        },
        calculateCloud: function(argument) {


        },

    },
    drawCloud: function() {

    }
});
