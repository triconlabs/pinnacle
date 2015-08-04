import Ember from 'ember';

export default Ember.Controller.extend({
    cloud: Ember.inject.service('cloud'),
    needs: ['test'],
    'fab-icon': 'add',
    'question': "",
    greenLit: function() {
        console.log("fabbing");
        if (this.get('question')) {
            $('paper-fab').css('transform', 'rotate(0deg)');
            $('paper-fab').css('background-color', '#00C853');
            $('paper-fab').attr('icon', 'check');
        } else if ($(".post-question").css('display') == 'block') {
            $('paper-fab').css('background-color', '#ED2553');
            $('paper-fab').css('transform', 'rotate(135deg)');
            $('paper-fab').attr('icon', 'add');
        } else {
            $('paper-fab').css('background-color', '#ED2553');
            $('paper-fab').attr('icon', 'add');

        }

    }.observes('question'),
    actions: {
        toggleDrawer: function() {
            $('core-drawer-panel')[0].togglePanel();
        },
        post: function(argument) {
            console.log($("#question-input").val());
            console.log(this.get('model.length'));
            var _this = this;
            if ($(".post-question").css('display') == 'block' && $("#question-input").val()) {
                console.log("posting new question");

                var question = _this.store.createRecord('question', {
                    question: ($("#question-input").val()).toString(),
                    number: _this.get('model.length'),
                    show: true
                });
                question.ParseACL = {
                    role: 'Moderators'
                };
                question.save().then(function() {
                    $('#toast').attr('text', 'question added');
                    Ember.$('#toast')[0].show();
                    $(".post-question").toggle('fast');
                    _this.set('question', "");
                })
            } else if ($(".post-question").css('display') == 'block') {
                console.log("no question");
                $('paper-fab').css('transform', 'rotate(0deg)');
                $(".post-question").toggle('fast');
            } else {
                console.log("no question");
                $('paper-fab').css('transform', 'rotate(135deg)');
                $(".post-question").toggle('fast');

            }
        },
        toggle: function(question) {
            question.toggleProperty('show');
        },
        runCloudCode: function(number) {
            if (!number) {
                number = 1;
            }
            var freqlist = [];
            var _this = this;
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


                    //  _this.set('words', freqlist);
                    // _this.send('calculateCloud');
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
