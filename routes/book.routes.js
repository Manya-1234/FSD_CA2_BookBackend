import { Router } from "express";
import { Book } from '../models/book.model.js'
const router = Router()

router.post("/api/books", async (req, res) => {
    try {
        const { title, author, category } = req.body;
        if (!title) {
            return res.status(400).json({
                message: "Title must be provided"
            })
        }
        const newbook = await Book.create({
            title: title,
            author: author,
            category: category
        })
        return res.status(201).json({
            message: "New book is added",
            book: newbook
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to create a new book"
        })
    }
})

router.get("/api/books", async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;

        const cpage = page > 1 ? page : 1;
        const climit = limit < 10 ? 10 : limit;
        const skip = (cpage - 1) * climit;
        const [books, totalrecords ] = await Promise.all([
            Book.find().skip(skip).limit(climit),
            Book.countDocuments()
        ])
        return res.status(200).json({
            message: "Required books are fetched",
            metadata: {
                currentpage: cpage,
                totalrecords: totalrecords
            },
            books: books
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to fetch books"
        })
    }
})

router.patch("/api/books/:id", async (req, res) => {
    try {
        const bookid = req.params.id;
        const newstatus = req.body
        const book = await Book.findById(bookid)
        if (!book) {
            return res.status(400).json({
                message: "Book with this id does not exist"
            })
        }
        book.availabilitystatus = newstatus.tolowerCase()
        await Book.save()
        return res.status(200).json({
            message:"Book status updated successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            message:"Failed to update book status"
        })
    }
})

export {router}