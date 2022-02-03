package repository

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"log"
	"time"

	"github.com/kevinanthony/goober/app/config"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Connection interface {
}

type connection struct {
	client *mongo.Client
}

func NewMongo(cfg config.Mongo) Connection {
	fmt.Println(cfg.GetConnectionURI())
	client, err := mongo.NewClient(options.Client().ApplyURI(cfg.GetConnectionURI()))
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		panic(err)
	}

	defer client.Disconnect(ctx)

	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		panic(err)
	}

	databases, err := client.ListDatabaseNames(ctx, bson.M{})
	if err != nil {
		panic(err)
	}
	fmt.Println(databases)

	return connection{
		client: client,
	}
}
