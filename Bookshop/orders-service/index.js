const express = require("express")
const app=express()
const authenticate=require("../middleware.js")

app.use(express.json())

app.listen(3001,()=>{
    console.log("Orders service running on port 3001")
})

const { sequelize, Order, Book} = require('../database');

app.get('/api/orders', authenticate, async (req, res) => {
    const userId=req.userId;
    try {
        const orders = await Order.findAll({ where: { userId } });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Error loading orders' });
    }
});

app.post('/api/orders',authenticate, async (req, res) => {
    const { bookId, quantity } = req.body;
    const userId = req.userId
    try {

        const book = await Book.findByPk(bookId);
        if (!book) {
            return res.status(400).json({ error: 'A book with this ID does not exist' });
        }


        const order = await Order.create({ userId, bookId, quantity });
        res.status(201).json({ message: 'Order created', orderId: order.id });
    } catch (err) {
        res.status(500).json({ error: 'Error creating order' });
    }
});

app.delete('/api/orders/:orderId', authenticate, async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const deletedRows = await Order.destroy({ where: { id: orderId } });

        if (deletedRows > 0) {
            res.json({ message: 'Order deleted' });
        } else {
            res.status(404).json({ error: 'Order does not exist' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error deleting order' });
    }
});

app.patch('/api/orders/:orderId', authenticate, async (req, res) => {
    const orderId = req.params.orderId;
    const { quantity } = req.body;

    try {
        const order = await Order.findByPk(orderId);

        if (!order) {
            return res.status(404).json({ error: 'Order does not exist' });
        }


        order.quantity = quantity;
        await order.save();

        res.json({ message: 'Order updated ', order });
    } catch (err) {
        res.status(500).json({ error: 'Error updating order' });
    }
});