import request from 'supertest'
import server, {  connectDB } from '../server'
import db from '../config/db'


describe('GET / api', () => {
    it('should send back a json response', async () => {
        const res = await request(server).get('/api')

        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body.message).toBe('Desde API')

        expect(res.status).not.toBe(404)
        expect(res.body.message).not.toBe('Desde api')
    })
})

jest.mock('../config/db')

describe('connectBD',() => {
    it('Should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate')
        .mockRejectedValueOnce(new Error('Hubo un error al conectar a la BD'))
        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error al conectar a la BD')
        )
    })
})