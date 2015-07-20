import Ember from 'ember';

export default Ember.Controller.extend({
    cloud: Ember.inject.service('cloud'),
    needs: ['test'],
    'fab-icon': 'add',
    actions: {
        toggleDrawer: function() {
            $('core-drawer-panel')[0].togglePanel();
        },
        post: function(argument) {
            console.log("posting new question");
            console.log($("paper-input").val());
            var self = this;
            if ($(".post-question").css('display') == 'block' && $("paper-input").val()) {

                var question = self.store.createRecord('question', {
                    question: ($("paper-input").val()).toString(),
                    number: 9,
                    show: true
                });
                question.save().then(function() {
                    alert("successfully added question");
                    $(".post-question").toggle('fast');
                })
            } else {
                $(".post-question").toggle('fast');
            }
        },
        toggle: function(question) {
            question.toggleProperty('show');
        },
        runCloudCode: function(number) {
            var freqlist = [];
            var self = this;
            var height = 600;
            var width = 600;
            this.get('cloud').run('hello', {
                    number: number

                })
                .then((ratings) => {
                    console.log("runCloudCode");
                    console.log(number);
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
                        Ember.$("svg").remove();
                        d3.select(".answers").append("svg")
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
    }
});
