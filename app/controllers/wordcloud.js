import Ember from 'ember';

export default Ember.Controller.extend({
    cloud: Ember.inject.service('cloud'),
    typeFace: 'Gorditas',
    minFontSize: 24,
    words: null,

    actions: {
        runCloudCode: function () {
            var freqlist = [];
            var self = this;
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

                    //  self.set('words', freqlist);
                    // self.send('calculateCloud');
                    var fill = d3.scale.category20();

                    d3.layout.cloud().size([300, 300])
                        .words(freqlist)
                        .rotate(0)
                        .font("Impact")
                        .fontSize(function (d) {
                            return d.size;
                        })
                        .on("end", draw)
                        .start();

                    function draw(words) {
                        d3.select("body").append("svg")
                            .attr("width", 300)
                            .attr("height", 300)
                            .append("g")
                            .attr("transform", "translate(150,150)")
                            .selectAll("text")
                            .data(words)
                            .enter().append("text")
                            .style("font-size", function (d) {
                                return d.size*15 + "px";
                            })
                            .style("font-family", "Impact")
                            .style("fill", function (d, i) {
                                return fill(i);
                            })
                            .attr("text-anchor", "middle")
                            .attr("transform", function (d) {
                                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                            })
                            .text(function (d) {
                                return d.text;
                            });
                    }
                });

        },
        calculateCloud: function (argument) {


        },

    },
    drawCloud: function () {

    }
});
