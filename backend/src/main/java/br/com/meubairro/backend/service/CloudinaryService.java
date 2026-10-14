package br.com.meubairro.backend.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(
            @Value("${CLOUDINARY_CLOUD_NAME}") String cloudName,
            @Value("${CLOUDINARY_API_KEY}") String apiKey,
            @Value("${CLOUDINARY_API_SECRET}") String apiSecret) {

        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret,
                "secure", true
        ));
    }

    public String uploadImage(byte[] imageBytes) throws Exception {
        Map<?, ?> result = cloudinary.uploader().upload(
                imageBytes,
                ObjectUtils.asMap(
                        "resource_type", "image",
                        "folder", "meu-bairro/ocorrencias"
                )
        );

        return (String) result.get("secure_url");
    }
}
