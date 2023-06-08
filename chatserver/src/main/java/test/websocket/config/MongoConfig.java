package test.websocket.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.ReactiveMongoDatabaseFactory;
import org.springframework.data.mongodb.SessionSynchronization;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;

@Configuration
public class MongoConfig  {
    //public class MongoConfig extends AbstractMongoClientConfiguration {
//    private String dbName = "mongotest";
//    private String dbUrl = "http://localhost:27017/";
//    @Bean
//    public ReactiveMongoTransactionManager transactionManager(ReactiveMongoDatabaseFactory dbFactory) {
//        return new ReactiveMongoTransactionManager(dbFactory);
//    }
    @Bean
    public ReactiveMongoTemplate reactiveMongoTemplate(ReactiveMongoDatabaseFactory factory) {
        ReactiveMongoTemplate mongoTemplate = new ReactiveMongoTemplate(factory);
        mongoTemplate.setSessionSynchronization(SessionSynchronization.ALWAYS);
        return mongoTemplate;
    }

//    @Override
//    public MongoClient mongoClient() {
//        ConnectionString connectionString = new ConnectionString(dbUrl);
//        MongoClientSettings mongoClientSettings = MongoClientSettings.builder().applyConnectionString(connectionString).build();
//        return MongoClients.create(mongoClientSettings);
//    }

//    @Override
//    protected String getDatabaseName() {
//        return dbName;
//    }
}