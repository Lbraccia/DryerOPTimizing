

function updateGrid() {
    const NC = parseInt(columnSlider.value);
    const NF = parseInt(rowSlider.value);

    columnInput.value = NC;
    rowInput.value = NF;

    containerSecadora.style.display = 'grid';
    containerSecadora.style.gridTemplateColumns = `repeat(${NC}, 2fr)`;
    containerSecadora.style.gridTemplateRows = `repeat(${NF}, 2fr)`;

    containerSecadora.innerHTML = '';

    for (let i = 0; i < NC * NF; i++) {
        const item = document.createElement('div');
        item.classList.add('grid-item');
        item.style.padding = 0;
        item.style.margin = "1px";
        containerSecadora.appendChild(item);
    }
}

columnSlider.addEventListener('input', () => {
    updateGrid();
});

rowSlider.addEventListener('input', () => {
    updateGrid();
});

columnInput.addEventListener('input', () => {
    columnSlider.value = columnInput.value;
    updateGrid();
});

rowInput.addEventListener('input', () => {
    rowSlider.value = rowInput.value;
    updateGrid();
});

