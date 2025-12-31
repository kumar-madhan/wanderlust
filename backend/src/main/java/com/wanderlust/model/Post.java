package com.wanderlust.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@Document(collection = "posts")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Post {
    @Id
    private String id;
    private String title;
    private String authorName;
    private String description;
    private String imageLink;
    private List<String> categories;
    @JsonAlias({"isFeaturedPost", "featuredPost"})
    private boolean featuredPost;
    private Date timeOfPost = new Date();
}
