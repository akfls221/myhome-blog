package com.taekwon.myhome.util;

import com.taekwon.myhome.exception.UploadFileException;
import com.taekwon.myhome.web.dto.ProfileDeleteRequestDto;
import com.taekwon.myhome.web.dto.ProfileResponseDto;
import lombok.RequiredArgsConstructor;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ProfileMaker {

    @Value("${FilePath.dev}")
    private String rootPath;

    private String os = System.getProperty("os.name").toLowerCase();


    public ProfileResponseDto saveFile(MultipartFile multipartFile) throws IOException {
        if(fileExistenceCheck(multipartFile)){

            String originalFilename = multipartFile.getOriginalFilename();
            String extension = getExtension(originalFilename);
            String noExtension = removeExtension(originalFilename);
            String uuidFilename = uuidFilename(originalFilename);
            BufferedImage resizeImage = resizeProfileImage(multipartFile, 400, 400);
            String uploadPath = saveFolder().get("uploadPath");
            String datePath = saveFolder().get("datePath");
            String requestPath = null;
            if (os.contains("win")) {
                requestPath = datePath + "\\" + uuidFilename;
            } else if (os.contains("linux")) {
                requestPath = datePath + "/" + uuidFilename;
            }

            File saveProfile = new File(uploadPath, uuidFilename);
            ImageIO.write(resizeImage, extension, saveProfile);
            return ProfileResponseDto.builder()
                    .extension(extension)
                    .noExtension(noExtension)
                    .savePath(saveProfile.getPath())
                    .uuidFilename(uuidFilename)
                    .datePath(datePath)
                    .requestPath(requestPath)
                    .build();
        } else {
            throw new UploadFileException("프로필 업로드에 실패했습니다. 관리자에게 문의해주세요");
        }
    }

    public String deleteProfile(ProfileDeleteRequestDto requestPath) {
        File file = null;

        if (os.contains("win")) {
            file = new File(rootPath + "\\" + requestPath.getDeletePath());
        } else if (os.contains("linux")) {
            file = new File(rootPath + "/" + requestPath.getDeletePath());
        }

        if (file.exists()) {
            file.delete();
        } else {
            throw new UploadFileException("삭제할 파일이 없습니다.");
        }
        return "ok";
    }

    private boolean fileExistenceCheck(MultipartFile multipartFile) {
        if (multipartFile.isEmpty()) {
            throw new UploadFileException("첨부된 파일이 존재하지 않습니다. 다시 확인해 주세요");
        } else if(!multipartFile.getContentType().startsWith("image")){
            throw new UploadFileException("올바른 이미지파일이 아닙니다. 다시 확인해 주세요");
        } else {
            return true;
        }
    }

    private String removeExtension(String originalFilename) {
        return originalFilename.substring(0, originalFilename.lastIndexOf("."));
    }

    private String getExtension(String originalFilename) {
        return originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
    }

    private String uuidFilename(String fileName) {
        String uuid = UUID.randomUUID().toString();
        return uuid + "_" + fileName;
    }

    private Map<String, String> saveFolder() {
        Map<String, String> pathMap = new HashMap<>();
        LocalDateTime today = LocalDateTime.now();
        String subPath = today.format(DateTimeFormatter.ISO_DATE);
        String datePath = subPath.replace("-", File.separator);

        File uploadPath = new File(rootPath, subPath.replace("-", File.separator));

        if (!uploadPath.exists()) {
            uploadPath.mkdirs();
        }

        pathMap.put("datePath", datePath);
        pathMap.put("uploadPath", uploadPath.getPath());

        return pathMap;
    }

    private BufferedImage resizeProfileImage(MultipartFile multipartFile, int resizeWidth, int resizeHeight) throws IOException {
        InputStream in = multipartFile.getInputStream();
        BufferedImage originalImage = ImageIO.read(in);
        BufferedImage resizeImage = Thumbnails.of(originalImage).size(resizeWidth, resizeHeight).asBufferedImage();
        in.close();
        return resizeImage;
    }
}
