
-- -------------------------------------------------
create database ficheiro;
use ficheiro;
-- -------------------------------------------------
                           -- USUARIOS
create table usuarios(
	id int primary key auto_increment,
	apelido varchar(20) not null,
    idade date not null,
	email varchar(50) not null,
    senha varchar (50) not null,
    ingresso date not null,
    unique (email)
);
                           -- USUARIOS OPTIONS
select * from usuarios;    -- SELECT
drop table usuarios;       -- DROP

-- -------------------------------------------------
						   -- FICHA D&D
create table ficha(
	-- ids ficha
	id int primary key auto_increment not null,
    idUsuario int,
    foreign key (idUsuario) references usuarios(id),
    -- header
    nomePersonagem varchar(50),
    classe varchar(50),
    nivel int,
    raca varchar(50),
    antecedente varchar(50),
    alinhamento varchar(50),
    nomeJogador varchar(50),
    pontosExperiencia int,
	-- stats
    forcaMod int,
    forca int,
    destrezaMod int,
    destreza int,
    constituicaoMod int,
    constituicao int,
    sabedoriaMod int,
    sabedoria int,
    carismaMod int,
    carisma int,
    -- info
    inspiracao int,
    proficiencia int,
    classeArmadura int,
    iniciativa int,
    deslocamento int,
    -- salvaguarda
    salvaProficienteFor boolean,
    salvaguardaFor int,
    salvaProficienteDex boolean,
    salvaguardaDex int,
    salvaProficienteCon boolean,
    salvaguardaCon int,
    salvaProficienteInt boolean,
    salvaguardaInt int,
    salvaProficienteSab boolean,
    salvaguardaSab int,
    salvaProficienteCar boolean,
    salvaguardaCar int,
    -- pericia
    perProficienteAcr boolean,
    periciaAcr int,
    perProficienteArc boolean,
    periciaArc int,
    perProficienteAtl boolean,
    periciaAtl int,
    perProficienteAtu boolean,
    periciaAtu int,
    perProficienteEng boolean,
    periciaEng int,
    perProficienteFur boolean,
    periciaFur int,
    perProficienteHis boolean,
    periciaHis int,
    perProficienteInt boolean,
    periciaInt int,
    perProficienteInv boolean,
    periciaInv int,
    perProficienteLid boolean,
    periciaLid int,
    perProficienteMed boolean,
    periciaMed int,
    perProficienteNat boolean,
    periciaNat int,
    perProficientePerc boolean,
    periciaPer int,
    perProficientePers boolean,
    periciaPers int,
    perProficientePre boolean,
    periciaPre int,
    perProficienteRel boolean,
    periciaRel int,
    perProficienteSob boolean,
    periciaSob int,
    -- pv
    pvMaximo int,
    pvAtual int,
    pvTemporario int,
    dadoVidaTotal int,
    dadoVida int,
    sucesso1 boolean,
    sucesso2 boolean,
    sucesso3 boolean,
    falha1 boolean,
    falha2 boolean,
    falha3 boolean,
    -- sobre
    tracoPersonalidade varchar(255),
    ideais varchar(255),
    vinculos varchar(255),
    fraquezas varchar(255),
    -- ataques
    ataqueNome1 varchar(50),
    ataqueBonus1 varchar(50),
    ataqueDano1 varchar(50),
    ataqueNome2 varchar(50),
    ataqueBonus2 varchar(50),
    ataqueDano2 varchar(50),
    ataqueNome3 varchar(50),
    ataqueBonus3 varchar(50),
    ataqueDano3 varchar(50),
    ataquesConjuracoes varchar(255),
    -- extra
    sabedoriaPassiva int,
    caracteristicasTalentos varchar(510),
    outrasProficiencias varchar(255),
    -- equipamento
    pc int,
    pp int,
    pe int,
    po int,
    pl int,
    equipamento varchar(255)
);
						   -- FICHA OPTIONS
select * from ficha;       -- SELECT
drop table ficha;          -- DROP

-- -------------------------------------------------
                           -- SALA
create table sala(
	id int primary key auto_increment,
    idUsuarioCriador int not null,
    nome varchar(50) not null,
    sistema int,
    descricao varchar(255),
    senha varchar(50),
    criada date not null,
    foreign key (sistema) references sistema(id),
    foreign key (idUsuarioCriador) references usuarios(id)
);
                           -- SALA OPTIONS
select * from sala;        -- SELECT
drop table sala;           -- DROP
truncate table sala;       -- TRUNCATE

-- -------------------------------------------------
                           -- SALA USUARIO
create table salaUsuario(
	id int primary key auto_increment,
    idUsuario int not null,
    idSala int not null,
    foreign key (idUsuario) references usuarios(id),
    foreign key (idSala) references sala(id)
);
                           -- SALA USUARIO OPTIONS
select * from salaUsuario; -- SELECT
drop table salaUsuario;    -- DROP

-- -------------------------------------------------
						    -- SALA FICHAS
create table salaFichas(
	id int primary key auto_increment,
    idSala int not null,
    idFicha int not null,
    foreign key (idFicha) references ficha(id),
    foreign key (idSala) references sala(id),
    x float,
    y float
);
							-- SALA FICHAS OPTIONS
select * from salaFichas;   -- SELECT
drop table salaFichas;      -- DROP

-- -------------------------------------------------
                            -- SISTEMA
create table sistema (
	id int primary key auto_increment,
    nome varchar(50) not null
);
                            -- SISTEMA OPTIONS
select * from sistema;      -- SELECT
insert into sistema (nome) values ('Dungeons & Dragons');
-- -------------------------------------------------
CREATE VIEW viewSala AS    -- VIEW SALA
SELECT 
    s.id,
    s.nome AS nome_sala,
    sys.nome AS nome_sistema,
    s.criada,
    s.idUsuarioCriador
FROM 
    Sala s
JOIN 
    Sistema sys ON s.sistema = sys.id;
    
-- -------------------------------------------------
CREATE VIEW viewSalaUsuario AS
SELECT 
    su.idSala,
    u.id AS idUsuario,
    u.apelido AS nomeUsuario,
    s.nome AS nomeSala,
    sis.nome AS nomeSistema
FROM 
    salaUsuario su
JOIN 
    usuarios u ON su.idUsuario = u.id
JOIN 
    sala s ON su.idSala = s.id
JOIN 
    sistema sis ON s.sistema = sis.id;
    
-- -------------------------------------------------
CREATE VIEW viewPosicao AS
SELECT
	sf.idSala, sf.idFicha, sf.x, sf.y
FROM
	salaFichas sf;

select * from viewPosicao where idFicha = 1 and idSala = 7;

	