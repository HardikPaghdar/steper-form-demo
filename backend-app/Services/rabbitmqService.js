const amqp = require('amqplib');
const fs = require('fs');
const XLSX = require('xlsx');
const FileLineItem = new (require('./../Models/fileLineItem'))();

let channel;

async function setupRabbitMQ() {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        channel = await connection.createChannel();
        await channel.assertQueue('fileProcessingQueue', { durable: true });
        console.log('RabbitMQ connected and queue asserted.');
        await processFiles();
    } catch (err) {
        console.error('Failed to connect to RabbitMQ:', err);
    }
}

function getChannel() {
    return channel;
}

async function sendToQueue(queue, message) {
    if (!channel) {
        console.log('RabbitMQ channel is not initialized.');
        await setupRabbitMQ();
    }
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
    console.log('Message sent to queue:', message);
}

async function processFiles() {
    if (!channel) {
        throw new Error('RabbitMQ channel is not initialized.');
    }
    channel.consume('fileProcessingQueue', async (msg) => {
        if (msg !== null) {
            const { filePath, dataId } = JSON.parse(msg.content.toString());
            try {
                if (fs.existsSync(filePath)) {
                    const processedData = await processXlsxFile(filePath); // Implement this
                    await FileLineItem.add({
                        formIntakeId: dataId,
                        fileData: processedData
                    });
                    fs.unlinkSync(filePath);
                    global.io.emit(`fileProcessed-${dataId}`, {dataId, processedData, message: 'File processed successfully'});
                }
                channel.ack(msg);
            } catch (error) {
                console.error(`Failed to process file: ${filePath}`, error);
                channel.nack(msg);
            }
        }
    });
}

async function processXlsxFile(filePath) {
    try {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        if (!jsonData || jsonData.length === 0) {
            throw new Error('Empty or invalid XLSX file');
        }
        const fileData = jsonData.slice(1).map(row => ({
            description: row[0] || '',
            budget: row[2] || 0
        }));
        const validFileData = fileData.filter(item => item.description);
        if (validFileData.length === 0) {
            throw new Error('No valid data to save');
        }
        console.log('Data saved successfully to MongoDB');
        return validFileData;
    } catch (error) {
        console.error('Error reading XLSX file or saving data:', error);
        throw error;
    }
}

module.exports = { setupRabbitMQ, getChannel, sendToQueue };
