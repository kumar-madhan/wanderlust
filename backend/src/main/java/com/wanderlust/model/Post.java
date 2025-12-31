package com.wanderlust.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import java.util.Date;

@Data
@Document(collection = "posts")
public class Post {
    @Id
    private String id;
    private String title;
    private String authorName;
    private String description;
    private String imageLink;
    private List<String> categories;
    private boolean isFeaturedPost;
    private Date timeOfPost = new Date();
}
