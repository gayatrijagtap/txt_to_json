const WS = " ";
const ES = "";
const CR = "\r";

const STRING_DATA =
  "FIRST_NAME     LAST_NAME        NUMBER               EMAIL                        ADDRESS          " +
  "\n" +
  "Debra          Burks            880012XXXX           debra.burks@yahoo.com        9273 Thome Ave., Orchard Park, NY - 14127" +
  "\n" +
  "Kasha          Todd             NULL                 kasha.todd@yahoo.com         910, Vine Street, Campbell, CA - 95008";

const SPLITTED_DATA = STRING_DATA.split("\n");

const LINE1 = SPLITTED_DATA[1];

const LINE2 = SPLITTED_DATA[2];

const START_POINTS = [0, 15, 32, 53, 82, 123];

const HEADERS = ["FIRST_NAME", "LAST_NAME", "NUMBER", "EMAIL", "ADDRESS"];

const OBJ_FOR_LINE_1 = {
  FIRST_NAME: "Debra",
  LAST_NAME: "Burks",
  NUMBER: "880012XXXX",
  EMAIL: "debra.burks@yahoo.com",
  ADDRESS: "9273 Thome Ave., Orchard Park, NY - 14127"
};

const OBJ_FOR_LINE_2 = {
  FIRST_NAME: "Kasha",
  LAST_NAME: "Todd",
  NUMBER: "NULL",
  EMAIL: "kasha.todd@yahoo.com",
  ADDRESS: "910, Vine Street, Campbell, CA - 95008"
};

module.exports = {
  WS,
  ES,
  CR,
  SPLITTED_DATA,
  LINE1,
  LINE2,
  START_POINTS,
  HEADERS,
  OBJ_FOR_LINE_1,
  OBJ_FOR_LINE_2
};
