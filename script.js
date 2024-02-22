const seatElement = document.getElementById("seats");
const body = document.getElementById("body");
const totalSeats = document.getElementById("total-seats");
totalSeats.textContent = 20;
const nextButton = document.getElementById("next");
const cuponDiv = document.getElementById("cupon-div");
const cuponInput = document.getElementById("cupon");

const total = document.getElementById("total");
const grandTotal = document.getElementById("grand-total");

let discount = 0;

total.textContent = 0;
grandTotal.textContent = 0;

let selectedSeats = [];
const seats = [
  {
    row: "A",
    seats: ["A1", "A2", "A3", "A4"],
  },
  {
    row: "B",
    seats: ["B1", "B2", "B3", "B4"],
  },
  {
    row: "C",
    seats: ["C1", "C2", "C3", "C4"],
  },
  {
    row: "D",
    seats: ["D1", "D2", "D3", "D4"],
  },
  {
    row: "E",
    seats: ["E1", "E2", "E3", "E4"],
  },
];

function generateSeatLayout() {
  for (let seat of seats) {
    const seatRow = document.createElement("div");
    seatRow.classList.add(
      "flex",
      "gap-6",
      "justify-between",
      "mt-6",
      "w-full",
      "text-gray-950"
    );

    seatRow.innerHTML = `
      <div class="flex justify-between">
        <div class="my-auto">${seat.row}</div>
      </div>
    `;

    for (let i = 0; i < 4; i++) {
      let seatNumber = seat.seats[i];
      const seatElement = document.createElement("div");
      seatElement.classList.add(
        "flex",
        "justify-center",
        "px-11",
        "py-5",
        "rounded-xl",
        "bg-stone-50",
        "w-full",
        i === 1 ? "mr-5" : i === 2 ? "ml-5" : "m-0"
      );
      seatElement.textContent = seatNumber;

      seatElement.addEventListener("click", function () {
        if (selectedSeats.length === 4) {
          if (selectedSeats.includes(seatNumber)) {
            selectedSeats = selectedSeats.filter(
              (selectedSeat) => selectedSeat !== seatNumber
            );

            showSelectedSeats(selectedSeats);
            totalSeats.textContent = 20 - selectedSeats.length;

            seatElement.classList.toggle("bg-stone-50");
            seatElement.classList.toggle("bg-green-500");
            seatElement.classList.toggle("text-white");
          } else {
            alert("You can only select 4 seats");
            return;
          }
        } else {
          if (selectedSeats.includes(seatNumber)) {
            selectedSeats = selectedSeats.filter(
              (selectedSeat) => selectedSeat !== seatNumber
            );
          } else {
            selectedSeats.push(seatNumber);
          }
          showSelectedSeats(selectedSeats);
          totalSeats.textContent = 20 - selectedSeats.length;

          seatElement.classList.toggle("bg-stone-50");
          seatElement.classList.toggle("bg-green-500");
          seatElement.classList.toggle("text-white");

          total.textContent = selectedSeats.length * 550;
          grandTotal.textContent = selectedSeats.length * 550 - discount;
        }
      });
      seatRow.appendChild(seatElement);
    }
    seatElement.appendChild(seatRow);
  }
}

generateSeatLayout();

function showSelectedSeats(arr) {
  const selectedSeatsDiv = document.getElementById("selected-seats");
  selectedSeatsDiv.innerHTML = "";

  const seatLength = document.getElementById("seats-length");
  seatLength.textContent = arr.length;

  for (let seat of arr) {
    const seatElement = document.createElement("div");
    seatElement.classList.add("rounded-xl", "py-2", "flex", "justify-between");
    seatElement.textContent = seat;
    const economyText = document.createElement("div");
    economyText.textContent = "Economy";
    seatElement.appendChild(economyText);

    const priceText = document.createElement("div");
    priceText.textContent = "$550";
    seatElement.appendChild(priceText);

    selectedSeatsDiv.appendChild(seatElement);
  }
}

const applyButton = document.getElementById("apply");

function applyCopon() {
  if (cuponInput.value === "NEW15") {
    discount = total.textContent * 0.15;
    grandTotal.textContent = total.textContent - discount;
    cuponDiv.classList.add("hidden");
  } else if (cuponInput.value === "Couple 20") {
    discount = total.textContent * 0.2;
    grandTotal.textContent = total.textContent - discount;
    cuponDiv.classList.add("hidden");
  } else {
    alert("Invalid cupon. Please add a valid cupon!");
  }
}

applyButton.addEventListener("click", applyCopon);

const modal = document.getElementById("modal");

nextButton.addEventListener("click", function () {
  if (selectedSeats.length === 0) {
    alert("Please select a seat");
    return;
  }
  modal.classList.remove("hidden");
});

function closeModal() {
  selectedSeats = [];
  total.textContent = 0;
  grandTotal.textContent = 0;
  totalSeats.textContent = 20;
  showSelectedSeats(selectedSeats);
  cuponDiv.classList.remove("hidden");
  cuponInput.value = "";
  seatElement.innerHTML = "";
  generateSeatLayout();
  modal.classList.add("hidden");
}
