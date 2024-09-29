import React, {useEffect, useRef} from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import * as d3 from "d3";


function HomePage() {
    const svgRef = useRef(null); // Ref for the SVG element
    const width = 450; // Set your desired width
    const height = 450; // Set your desired height
    const margin = {top: 10, right: 30, bottom: 30, left: 40};
    const radius = Math.min(width, height) / 2 - margin.left;
    const chartRef = useRef(null);


    var dataSource = {
        datasets: [{
            data: [],
            backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#fd6b19', '#3bfd19', '#0937f1', '#545657', '#ff0000',]
        }], labels: []
    };

    useEffect(() => {

        var d3Colors = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]

        function getbudgetData() {
            axios.get('http://localhost:3000/budget')
                .then(function (res) {
                    for (var i = 0; i < res.data.myBudget.length; i++) {
                        dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
                        dataSource.labels[i] = res.data.myBudget[i].title;
                    }
                    console.log(dataSource)
                    var d3Data = dataSource.labels.map((label, index) => ({
                        name: label,
                        value: dataSource.datasets[0].data[index].toString(), // Convert value to string
                        color: d3Colors[index]
                    }));
                    createChart(dataSource);
                    createD3jsChart(d3Data)
                }).catch(err => {
                console.log(err)
            });
        }

        function createChart() {
            const ctx = document.getElementById('myChart').getContext('2d');
            if (chartRef.current == null) {
                chartRef.current = new Chart(ctx, {
                    type: 'pie', data: dataSource
                });
            }


        }

        function createD3jsChart(data) {
            const svg = d3.select(svgRef.current)
                .attr("viewBox", `0 0 ${width} ${height}`)
                .append("g")
                .attr("transform", `translate(${width / 2}, ${height / 2})`);

            const pie = d3.pie()
                .sort(null)
                .value(d => d.value);

            const arc = d3.arc()
                .innerRadius(radius * 0.5) // Size of the donut hole
                .outerRadius(radius * 0.8);

            const outerArc = d3.arc()
                .innerRadius(radius * 0.9)
                .outerRadius(radius * 0.9);

            const data_ready = pie(data);

            // Build the pie chart
            svg.selectAll("allSlices")
                .data(data_ready)
                .enter()
                .append("path")
                .attr("d", arc)
                .attr("fill", (d) => d.data.color || d3Colors[d.index % d3Colors.length])
                .attr("stroke", "white")
                .style("stroke-width", "2px")
                .style("opacity", 0.7);

            // Add the polylines between chart and labels
            svg.selectAll("allPolylines")
                .data(data_ready)
                .enter()
                .append("polyline")
                .attr("stroke", "black")
                .style("fill", "none")
                .attr("stroke-width", 1)
                .attr("points", d => {
                    const posA = arc.centroid(d);
                    const posB = outerArc.centroid(d);
                    const posC = outerArc.centroid(d);
                    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                    posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
                    return [posA, posB, posC];
                });

            // Add the labels
            svg.selectAll("allLabels")
                .data(data_ready)
                .enter()
                .append("text")
                .text(d => d.data.name)
                .attr("transform", d => {
                    const pos = outerArc.centroid(d);
                    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                    pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                    return `translate(${pos})`;
                })
                .style("text-anchor", d => {
                    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                    return midangle < Math.PI ? "start" : "end";
                });
        }

        getbudgetData();
    }); // Now the dependency array is empty

    return (<main className="center" id="main">
            <section className="page-area">
                <div className="grid-container">
                    <article className="grid-item">
                        <h1>Stay on track</h1>
                        <p>
                            Do you know where you are spending your money? If you really stop to track it down,
                            you would get surprised! Proper budget management depends on real data... and this
                            app will help you with that!
                        </p>
                    </article>

                    <article className="grid-item">
                        <h1>Alerts</h1>
                        <p>
                            What if your clothing budget ended? You will get an alert. The goal is to never go over the
                            budget.
                        </p>
                    </article>

                    <article className="grid-item">
                        <h1>Results</h1>
                        <p>
                            People who stick to a financial plan, budgeting every expense, get out of debt faster!
                            Also, they to live happier lives... since they expend without guilt or fear...
                            because they know it is all good and accounted for.
                        </p>
                    </article>

                    <article className="grid-item">
                        <h1>Free</h1>
                        <p>
                            This app is free!!! And you are the only one holding your data!
                        </p>
                    </article>

                    <article className="grid-item">
                        <h1>Stay on track</h1>
                        <p>
                            Do you know where you are spending your money? If you really stop to track it down,
                            you would get surprised! Proper budget management depends on real data... and this
                            app will help you with that!
                        </p>
                    </article>

                    <article className="grid-item">
                        <h1>Alerts</h1>
                        <p>
                            What if your clothing budget ended? You will get an alert. The goal is to never go over the
                            budget.
                        </p>
                    </article>

                    <article className="grid-item">
                        <h1>Results</h1>
                        <p>
                            People who stick to a financial plan, budgeting every expense, get out of debt faster!
                            Also, they to live happier lives... since they expend without guilt or fear...
                            because they know it is all good and accounted for.
                        </p>
                    </article>
                    <article className="grid-item">
                        <h1>D3JS Chart</h1>
                        <svg ref={svgRef} width="100" height="100"></svg>

                    </article>

                    <article className="grid-item" style={{justifySelf: "left"}}>
                        <h1>Chart</h1>
                        <canvas id="myChart" width="250px" height="250px" role="img"></canvas>
                    </article>

                </div>


            </section>

        </main>

    );
}


export default HomePage;
