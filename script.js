function calcularForca() {
    const k = 8.99e9; // Constante de Coulomb (N·m²/C²)
    let q1 = parseFloat(document.getElementById("q1").value);
    let q2 = parseFloat(document.getElementById("q2").value);

    if (isNaN(q1) || isNaN(q2)) {
        alert("Por favor, insira valores válidos para as cargas.");
        return;
    }

    // Converter de microcoulombs para coulombs (1 µC = 1e-6 C)
    q1 *= 1e-6;
    q2 *= 1e-6;

    const distancias = [0.1, 0.5, 1.0, 2.0, 5.0];
    let resultados = "";

    distancias.forEach(d => {
        const F = k * q1 * q2 / (d ** 2);
        resultados += `<p>d = ${d} m → F = ${F.toExponential(2)} N</p>`; // Notação científica
    });

    document.getElementById("resultado").innerHTML = resultados;

    desenharGrafico(distancias, q1, q2);
}

function desenharGrafico(distancias, q1, q2) {
    const k = 8.99e9;
    const graficoContainer = document.getElementById("grafico-container");

    document.getElementById("grafico").remove();

    let novoCanvas = document.createElement("canvas");
    novoCanvas.id = "grafico";
    graficoContainer.appendChild(novoCanvas);

    const ctx = novoCanvas.getContext("2d");
    const dados = distancias.map(d => k * q1 * q2 / (d ** 2));

    new Chart(ctx, {
        type: "line",
        data: {
            labels: distancias,
            datasets: [{
                label: "Força elétrica (N)",
                data: dados,
                borderColor: "yellow",
                backgroundColor: "rgba(255, 255, 0, 0.2)",
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: "Distância (m)" } },
                y: { 
                    title: { display: true, text: "Força elétrica (N)" }, 
                    ticks: {
                        callback: function(value) {
                            return value.toExponential(2); // Exibir em notação científica
                        }
                    }
                }
            }
        }
    });
}
