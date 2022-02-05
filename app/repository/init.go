package repository

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"log"
	"time"

	"github.com/kevinanthony/goober/app/config"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Connection interface {
	Bin() Connection
	Container() Connection
}

type connection struct {
	client     *mongo.Client
	database   *mongo.Database
	collection *mongo.Collection
}

func NewMongo(cfg config.Mongo) (Connection, func()) {
	fmt.Println(cfg.GetConnectionURI())
	client, err := mongo.NewClient(options.Client().ApplyURI(cfg.GetConnectionURI()))
	if err != nil {
		log.Fatal(err)
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		panic(err)
	}

	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		panic(err)
	}

	return connection{
			client:   client,
			database: client.Database("goober"),
		}, func() {
			cancel()

			_ = client.Disconnect(ctx)
		}
}

func (c connection) Bin() Connection {
	c.collection = c.database.Collection("bin")

	return c
}

func (c connection) Container() Connection {
	c.collection = c.database.Collection("bin")

	return c
}
