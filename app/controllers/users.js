import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        toggleDrawer: function() {
            $('core-drawer-panel')[0].togglePanel();
        },
        goBack: function() {
            this.transitionToRoute('test');
        },
        gotoUser: function(user) {
            this.transitionToRoute('user', user);
        },
        genderData: function() {
            var width = 300,
                height = 300,
                radius = Math.min(width, height) / 2;

            var color = d3.scale.ordinal()
                .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

            var arc = d3.svg.arc()
                .outerRadius(radius - 10)
                .innerRadius(radius - 70);

            var pie = d3.layout.pie()
                .sort(null)
                .value(function(d) {
                    return d.population;
                });

            var svg = d3.select("main").append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
            undefined
            var g = svg.selectAll(".arc")
                .data(pie(datain))
                .enter().append("g")
                .attr("class", "arc");

            g.append("path")
                .attr("d", arc)
                .style("fill", function(d) {
                    return color(d.data.age);
                });

            /*  g.append("text")
                  .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
                  .attr("dy", ".35em")
                  .style("text-anchor", "middle")*/


            var datain = [{
                "gender": "Male",
                "population": 7
            }, {
                "gender": "Female",
                "population": 3
            }]
        },
        animatedGenderplot: function() {

            var elementId = 'pieChart',
                data = {
                    pieChart: [{
                        color: 'red',
                        description: 'Ipsem lorem text goes here. And foo goes bar goes baz. That\'s up!!!',
                        title: 'flowers',
                        value: 0.62
                    }, {
                        color: 'blue',
                        description: 'Another ipsem text goes here. And baz goes bar goes foo. Oh yeah, whazzz up?',
                        title: 'trains',
                        value: 0.38
                    }]
                }
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
