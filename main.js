function readURL(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {
            $('.image-upload-wrap').hide();
            $('#loading').show();
            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').show();
            $('.image-title').html(input.files[0].name);
        }

        reader.readAsDataURL(input.files[0]);
        init().then(() => {
            console.log("now predict")
            predict();
            $('#loading').hide();
        });
    } else {
        removeUpload();
    }
}

function removeUpload() {
    $('.file-upload-input').replaceWith($('.file-upload-input').clone());
    $('.file-upload-content').hide();
    $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping');
});

function createBarChart(data) {
    // main_test3.js
    // Data for the bar chart

    // const data = [
    //     { name: "Category 1", value: 30 },
    //     { name: "Category 2", value: 50 },
    //     { name: "Category 3", value: 20 },
    //     { name: "Category 4", value: 40 },
    //     { name: "Category 5", value: 60 }
    // ];
    console.log("Data in createBarChart:", data);

    // Sort the data in descending order by value
    data.sort((a, b) => b.value - a.value);

    // Set the dimensions of the SVG and the bar chart
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    // Create the SVG element
    const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Create a group element for the bars
    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create a scale for the x-axis
    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([0, width - margin.left - margin.right]);

    // Create a scale for the y-axis
    const y = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, height - margin.top - margin.bottom])
        .padding(0.1);

    // Create the bars
    const bars = g.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", d => y(d.name))
        .attr("width", 0) // Start with zero width
        .attr("height", y.bandwidth())
        .attr("fill", (d, i) => d.color) // Highlight the topmost bar

    // Animate the bars on load
    bars.transition()
        .duration(10000) // Animation duration in milliseconds
        .attr("width", d => x(d.value));

    // Create the x-axis
    g.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
        .call(d3.axisBottom(x));

    // Create the y-axis
    g.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));

    // Add hover effect to highlight bars
    bars.on("mouseover", function (d) {
        d3.select(this).classed("highlighted", true);
    }).on("mouseout", function (d) {
        d3.select(this).classed("highlighted", false);
    });

}