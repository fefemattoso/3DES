CREATE DATABASE turmas_db;
USE turmas_db;

CREATE TABLE professor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(100)
);

CREATE TABLE turma (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    professor_id INT,
    FOREIGN KEY (professor_id) REFERENCES professor(id)
);

CREATE TABLE atividade (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255),
    turma_id INT,
    FOREIGN KEY (turma_id) REFERENCES turma(id)
);

-- População de dados para teste
INSERT INTO professor (nome, email, senha) VALUES 
('João', 'joao@email.com', 'senha123'),
('Maria', 'maria@email.com', 'senha123');

INSERT INTO turma (nome, professor_id) VALUES 
('Turma A', 1),
('Turma B', 1),
('Turma C', 2);

INSERT INTO atividade (descricao, turma_id) VALUES 
('Atividade 1', 1),
('Atividade 2', 2),
('Atividade 3', 3);
