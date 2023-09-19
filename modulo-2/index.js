const d = document;
let isRegister = false;
let userName;
// Fake bd
let bd = {
  dias: [
    {
      dia: "lunes",
      horas: [
        { hora: 8, usuarios: ["ana"] },
        { hora: 9, usuarios: [] },
        { hora: 10, usuarios: [] },
        { hora: 11, usuarios: [] },
        { hora: 12, usuarios: [] },
      ],
    },
    {
      dia: "martes",
      horas: [
        { hora: 8, usuarios: [] },
        { hora: 9, usuarios: [] },
        { hora: 10, usuarios: [] },
        { hora: 11, usuarios: [] },
        { hora: 12, usuarios: [] },
      ],
    },
    {
      dia: "miercoles",
      horas: [
        { hora: 8, usuarios: [] },
        { hora: 9, usuarios: [] },
        { hora: 10, usuarios: [] },
        { hora: 11, usuarios: [] },
        { hora: 12, usuarios: [] },
      ],
    },
    {
      dia: "jueves",
      horas: [
        { hora: 8, usuarios: [] },
        { hora: 9, usuarios: [] },
        { hora: 10, usuarios: ["ana"] },
        { hora: 11, usuarios: [] },
        { hora: 12, usuarios: [] },
      ],
    },
    {
      dia: "viernes",
      horas: [
        { hora: 8, usuarios: [] },
        { hora: 9, usuarios: [] },
        { hora: 10, usuarios: [] },
        { hora: 11, usuarios: [] },
        { hora: 12, usuarios: [] },
      ],
    },
    {
      dia: "sabado",
      horas: [
        { hora: 8, usuarios: [] },
        { hora: 9, usuarios: [] },
        { hora: 10, usuarios: [] },
        { hora: 11, usuarios: [] },
        { hora: 12, usuarios: [] },
      ],
    },
    {
      dia: "domingo",
      horas: [
        { hora: 8, usuarios: [] },
        { hora: 9, usuarios: [] },
        { hora: 10, usuarios: [] },
        { hora: 11, usuarios: [] },
        { hora: 12, usuarios: [] },
      ],
    },
  ],
};
// Fake users
const users = {
  users: [
    {
      name: "clara",
      pass: 1234,
    },
    {
      name: "paola",
      pass: 5678,
    },
    {
      name: "jose",
      pass: 9101,
    },
    {
      name: "ana",
      pass: 1213,
    },
    {
      name: "antonio",
      pass: 1415,
    },
    {
      name: "pedro",
      pass: 1617,
    },
    {
      name: "carolina",
      pass: 1819,
    },
    {
      name: "salome",
      pass: 2021,
    },
    {
      name: "eduardo",
      pass: 2223,
    },
    {
      name: "sara",
      pass: 2425,
    },
  ],
};

const containerCalendary = d.getElementById("container-calendary");
const inputName = d.querySelector(".name"),
  inputPass = d.querySelector(".pass"),
  inputSubmit = d.querySelector(".submit"),
  form = d.querySelector("form"),
  rowHour = d.querySelector(".row");
let container = d.getElementById("container");
let containerBtn = d.createElement("section");
let logOut = d.createElement("button");
let meet = d.createElement("button");
let coincidences = d.createElement("div");

coincidences.classList.add("coincidences");
containerBtn.classList.add("container-btn");

const paintCalendary = () => {
  let containerColumn = d.createElement("div");
  let containerRow = d.createElement("div");

  //
  containerColumn.id = "container-column";
  containerRow.id = "container-row";

  // Logout button
  logOut.textContent = "Logout";
  logOut.classList.add("log-out");
  // Meet button
  meet.classList.add("meet");
  meet.textContent = "Meet";

  // Adding schedule in hourHead
  bd.dias[0].horas.map((e) => {
    let space = d.createElement("div");
    let hourHead = d.createElement("div");

    space.classList.add("space");
    hourHead.classList.add("column-hour");
    hourHead.textContent = e.hora;

    containerColumn.appendChild(space);
    containerColumn.appendChild(hourHead);
    containerCalendary.appendChild(containerColumn);
  });

  bd.dias.map((el) => {
    let row = d.createElement("div");
    let headRow = d.createElement("div");

    // Adding styles
    row.classList.add("row");
    headRow.textContent = el.dia;
    headRow.classList.add("headRow");

    // Adding to DOM
    row.appendChild(headRow);
    containerRow.appendChild(row);
    containerCalendary.appendChild(containerRow);

    // Creating hours

    el.horas.map((e) => {
      let hour = d.createElement("div");
      if (e.usuarios.length > 0) {
        //console.log(e.usuarios);
        hour.style.backgroundColor = "rgb(89, 89, 201)";
        hour.textContent = `${e.usuarios.join(", ")}`;
      }
      hour.classList.add("column");
      hour.classList.add("clickable");
      hour.id = `${el.dia}${e.hora}`;
      row.appendChild(hour);
      containerRow.appendChild(row);
      containerCalendary.appendChild(containerRow);
    });
  });
  containerBtn.appendChild(logOut);
  containerBtn.appendChild(meet);
  container.appendChild(containerCalendary);
  container.appendChild(containerBtn);
  container.style.display = "flex";
};

const login = () => {
  for (let clave in users) {
    for (let e in users[clave]) {
      console.log(typeof inputPass.value);
      if (
        users[clave][e].name === inputName.value &&
        users[clave][e].pass === Number(inputPass.value)
      ) {
        isRegister = true;
        break;
      }
    }

    if (isRegister) {
      break;
    }
  }
};

d.addEventListener("click", (e) => {
  // Click the login button
  if (e.target.matches(".submit")) {
    login();

    if (isRegister) {
      userName = inputName.value;
      alert(`Welcome ${userName}`);
      containerCalendary.textContent = "";
      form.style.display = "none";
      paintCalendary();
    } else {
      // Unregistered user message
      alert(`Unregistered user`);
    }
  }

  // Click the logout button
  if (e.target.matches(".log-out")) {
    let isLogOut = confirm(`${userName}, are you sure you want to logout?`);
    //console.log(isLogOut);
    if (isLogOut) {
      form.style.display = "flex";
      container.style.display = "none";
      coincidences.innerHTML = "";
    }
  }

  // Click in table
  if (e.target.matches(".clickable")) {
    // Adding user to object and dom
    for (let clave in bd.dias) {
      if (bd.dias[clave].dia === e.target.id.replace(/[\d]+/, "")) {
        for (let el in bd.dias[clave].horas) {
          if (
            bd.dias[clave].horas[el].hora ===
            Number(e.target.id.replace(/[\D]+/, ""))
          ) {
            if (bd.dias[clave].horas[el].usuarios.includes(userName)) {
              // Removing
              bd.dias[clave].horas[el].usuarios = bd.dias[clave].horas[
                el
              ].usuarios.filter((usuario) => usuario !== userName);
              e.target.textContent = e.target.textContent.replace(
                `, ${userName}`,
                ""
              );

              console.log(e.target.textContent);
              if (bd.dias[clave].horas[el].usuarios.length <= 0) {
                e.target.style.backgroundColor = "transparent";
              }

              console.log(bd.dias[clave].horas[el].usuarios);
            } else if (!bd.dias[clave].horas[el].usuarios.includes(userName)) {
              // Adding
              bd.dias[clave].horas[el].usuarios.push(userName);
              e.target.style.backgroundColor = "rgb(89, 89, 201)";
              e.target.textContent += `, ${userName}`;

              //console.log(bd.dias[clave].horas[el].usuarios);
            }
            break;
          }
        }
        break;
      }
    }
  }

  if (e.target.matches(".meet")) {
    console.log("meet");
    let day;
    let hourAvailable;
    let available = 0;
    let usersAvailable;

    for (const key in bd.dias) {
      for (const i in bd.dias[key].horas) {
        if (bd.dias[key].horas[i].usuarios.length > available) {
          available = bd.dias[key].horas[i].usuarios.length;
          day = bd.dias[key].dia;
          hourAvailable = bd.dias[key].horas[i].hora;
          usersAvailable = bd.dias[key].horas[i].usuarios;
        }
      }
    }
    console.log(available, usersAvailable, day, hourAvailable);

    if (available <= 1) {
      coincidences.innerHTML = `
      <br>
      <h4>No coincidences</h4>
      `;
    }

    if (available > 1) {
      coincidences.innerHTML = `
    <br>
    <h4>Day with the most coincidences</h4>
    <p><b>Day: </b>${day}</p>
    <p><b>Hour:</b> ${hourAvailable}:00</p>
    <p><b>Users:</b> ${usersAvailable.join(",")}</p>
    `;
    }

    containerBtn.appendChild(coincidences);
  }
});
