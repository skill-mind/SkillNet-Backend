import express from "express";
import multer from "multer";
import JobController from "../controllers/job.controller.js";

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: "./uploads/temp",
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(
            null,
            file.fieldname +
                "-" +
                uniqueSuffix +
                "." +
                file.originalname.split(".").pop()
        );
    }
});

const upload = multer({
    storage: storage, // Configure the storage destination and filename for uploaded files
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Allow only image files by checking the MIME type
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only image files are allowed!"), false);
        }
    }
});

router.post(
    "/",
    upload.single("banner"),
    (req, res) => JobController.create(req, res)
);
// Route to get all job listings
router.get("/", (req, res) => JobController.findAll(req, res));
// Route to get a specific job by its ID
router.get("/:id", (req, res) => JobController.findById(req, res));
// Route to update a job, including uploading a banner image
router.put(
    "/:id",
    upload.single("banner"),
    (req, res) => JobController.update(req, res)
);
// Route to delete a specific job by its ID
router.delete("/:id", (req, res) => JobController.delete(req, res));

// Route to delete only the banner image of a specific job
router.delete("/:id/banner", (req, res) =>
    JobController.deleteBanner(req, res)
);

export default router;
