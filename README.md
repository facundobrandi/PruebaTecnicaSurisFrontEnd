# Proyecto Prueba Tecnica para SurisCode

En este proyecto se muestra el uso de React y el uso de C# .NET ademas del uso de SQL 

como se pedia en el proyecto se muestra una lista de Articulos a comprar y vendedores , se puede seleccionar un vendedor y sus articulos atraves de los checkbox 
las validaciones que se pidieron estan puestas en el backend para evitar cualquier equivocacion 

a modo de demostrar mis conocimientos con SQL pase el json de articulos a una base de datos usando estas tablas y tambien agregue los pedidos de tal manera que se sepa quien fue el que hizo el pedido para cual articulo

CREATE TABLE Articulos (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Codigo NVARCHAR(50),
    Descripcion NVARCHAR(255),
    Precio DECIMAL(18, 2),
    Deposito INT
);

CREATE TABLE Pedidos (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    articulo_id INT,
    FOREIGN KEY (articulo_id) REFERENCES [dbo].[Articulos](id)
);

tambien la lista de vendedores esta siendo pedida por un link mock como se pidio en la prueba 
