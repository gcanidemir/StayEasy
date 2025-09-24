package com.personal.stayeasy_backend.config;

import java.time.Duration;
import java.util.function.Supplier;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.BucketConfiguration;
import io.github.bucket4j.distributed.ExpirationAfterWriteStrategy;
import io.github.bucket4j.distributed.proxy.ProxyManager;
import io.github.bucket4j.redis.lettuce.cas.LettuceBasedProxyManager;
import io.lettuce.core.RedisClient;
import io.lettuce.core.RedisURI;
import io.lettuce.core.api.StatefulRedisConnection;
import io.lettuce.core.codec.ByteArrayCodec;
import io.lettuce.core.codec.RedisCodec;
import io.lettuce.core.codec.StringCodec;

@Configuration
public class RedisConfig {

    @Value("${redis.host}")
    private String redisHost;

    @Value("${redis.port}")
    private int redisPort;

    @Bean(destroyMethod = "shutdown")
    public RedisClient redisClient() {
        return RedisClient.create(RedisURI.builder()
            .withHost(redisHost)
            .withPort(redisPort)
            .withSsl(false)
            .build());
    }

    @Bean(destroyMethod = "close")
    public StatefulRedisConnection<String, byte[]> redisConnection(RedisClient redisClient) {
        return redisClient.connect(RedisCodec.of(StringCodec.UTF8, ByteArrayCodec.INSTANCE));
    }

    @Bean
    public ProxyManager<String> lettuceBasedProxyManager(StatefulRedisConnection<String, byte[]> redisConnection) {
        return LettuceBasedProxyManager.builderFor(redisConnection)
            .withExpirationStrategy(ExpirationAfterWriteStrategy.fixedTimeToLive(Duration.ofMinutes(1L)))
            .build();
    }

    @Bean
    public Supplier<BucketConfiguration> bucketConfiguration() {
        return () -> BucketConfiguration.builder()
            .addLimit(Bandwidth.simple(50L, Duration.ofMinutes(1L)))
            .build();
    }
}
