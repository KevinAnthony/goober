package config

import "fmt"

type Mongo struct {
	Username string `env:"MONGO_USERNAME"`
	Password string `env:"MONGO_PASSWORD"`
	Cluster  string `env:"MONGO_CLUSTER"`
}

// TODO renove SSL false when
func (m Mongo) GetConnectionURI() string {
	return fmt.Sprintf("mongodb+srv://%s:%s@%s.mongodb.net/Goober?retryWrites=true", m.Username, m.Password, m.Cluster)
}

//?retryWrites=true&w=majority&ssl=false
