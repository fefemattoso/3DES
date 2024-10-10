-- CreateTable
CREATE TABLE "Automovel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "modelo" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "areaId" INTEGER NOT NULL,
    "concessionariaId" INTEGER NOT NULL,
    CONSTRAINT "Automovel_concessionariaId_fkey" FOREIGN KEY ("concessionariaId") REFERENCES "Concessionaria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Automovel_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Concessionaria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Area" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero" INTEGER NOT NULL
);
