import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState: {
    clientId: string, //Dropdown
    clients: [],
    clientLoanNumber: string, //text
    reportType: string, //radio button
    reportTypes: [],
    propertyUploadType: string, //radio
    address: string, //string
    propertyType: string, //radio
    propertySpecs: {
        aboveGradeSqft: null | number, //text
        isThereBasement: null | string, //radio
        bedrooms: null | number, //text
        bathrooms: null | number, //text
        yearBuilt: null | number, //text
        stories: null | number, //text
        lotSize: null | number //text
    },
    contactInformation: {
        name: string, //text
        phone: string, //text
        email: string, //text
    },
    submittedData: {},
    isError: boolean
} = {
    clientId: '',
    clients: [],
    clientLoanNumber: '',
    reportType: '',
    reportTypes: [],
    propertyUploadType: '',
    address: '',
    propertyType: '',
    propertySpecs: {
        aboveGradeSqft: null,
        isThereBasement: null,
        bedrooms: null,
        bathrooms: null,
        yearBuilt: null,
        stories: null,
        lotSize: null
    },
    contactInformation: {
        name: '',
        phone: '',
        email: '',
    },
    submittedData: {},
    isError: false,
}

export const formMode = createSlice({
    name: 'formMode',
    initialState,
    reducers: {
        changeValue(state, action) {
            const {inputId, inputValue} = action.payload;
            if (inputId in state) {
                state[inputId] = inputValue;
            } else if (inputId in state.propertySpecs) {
                state.propertySpecs[inputId] = inputValue;
            } else if (inputId in state.contactInformation) {
                state.contactInformation[inputId] = inputValue;
            }
        },
        resetPropertySpecs(state) {
            state.propertySpecs = {
                aboveGradeSqft: null,
                isThereBasement: null,
                bedrooms: null,
                bathrooms: null,
                yearBuilt: null,
                stories: null,
                lotSize: null,
            };
        },
        showValidationError(state) {
            state.isError = true
        },
        hideValidationError(state) {
            state.isError = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchClients.pending, (state) => {
                state.isError = false
            })
            .addCase(fetchClients.fulfilled, (state, action) => {
                state.clients = action.payload
            })
            .addCase(fetchClients.rejected, (state) => {
                state.isError = true
            })
            .addCase(fetchReportTypes.pending, (state) => {
                state.isError = false
            })
            .addCase(fetchReportTypes.fulfilled, (state, action) => {
                state.reportTypes = action.payload;
            })
            .addCase(fetchReportTypes.rejected, (state) => {
                state.isError = true
            })
            .addCase(submitDataAndSubscribe.pending, (state) => {
                state.isError = false
            })
            .addCase(submitDataAndSubscribe.fulfilled, (state, action) => {
                state.submittedData = action.payload;
            })
            .addCase(submitDataAndSubscribe.rejected, (state) => {
                state.isError = true
            });

    },

})

export const fetchClients: any = createAsyncThunk(
    'formMode/fetchClients',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/clients`) // Replace with your API URL
            return response.data.data.map((mp:any) => {
                return {value: mp.id, label: mp.name}
            })
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const fetchReportTypes: any = createAsyncThunk(
    'formMode/fetchReportTypes',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/report-types`) // Replace with your API URL
            return response.data.data.map(mp => {
                return {
                    value: mp.name,
                    label: mp.label
                }
            });
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const submitDataAndSubscribe = createAsyncThunk(
    'formMode/submitDataAndSubscribe',
    async (data: any, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/form`, data, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const formModeActions = formMode.actions
