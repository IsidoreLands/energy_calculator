function addRowListeners(row) {
    const editBtn = row.querySelector('.edit-btn');
    const deleteBtn = row.querySelector('.delete-btn');

    editBtn.addEventListener('click', () => {
        const cells = row.cells;
        const varNameInput = document.getElementById('var-name');
        const varAmountInput = document.getElementById('var-amount');
        const varUnitInput = document.getElementById('var-unit');
        varNameInput.value = cells[0].textContent;
        varAmountInput.value = cells[1].textContent;
        varUnitInput.value = cells[2].textContent;
        row.remove(); // Remove old row; re-add after edit
    });

    deleteBtn.addEventListener('click', () => {
        row.remove();
    });
}
