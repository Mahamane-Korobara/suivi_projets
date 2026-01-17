// hooks/useLocalStorage.js
"use client";
import { useState, useEffect, useCallback } from 'react';

/**
 * Hook personnalisé pour gérer le localStorage avec React
 * @param {string} key - Clé du localStorage
 * @param {any} initialValue - Valeur initiale si aucune valeur n'existe
 * @returns {[any, function, function]} [value, setValue, removeValue]
 */
export function useLocalStorage(key, initialValue) {
    // État pour stocker la valeur
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Erreur lors de la lecture de ${key} depuis localStorage:`, error);
            return initialValue;
        }
    });

    // Fonction pour mettre à jour la valeur
    const setValue = useCallback((value) => {
        try {
            // Permettre à value d'être une fonction comme useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);

            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.error(`Erreur lors de l'écriture de ${key} dans localStorage:`, error);
        }
    }, [key, storedValue]);

    // Fonction pour supprimer la valeur
    const removeValue = useCallback(() => {
        try {
            setStoredValue(initialValue);

            if (typeof window !== 'undefined') {
                window.localStorage.removeItem(key);
            }
        } catch (error) {
            console.error(`Erreur lors de la suppression de ${key} depuis localStorage:`, error);
        }
    }, [key, initialValue]);

    // Écouter les changements de localStorage dans d'autres onglets
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === key && e.newValue !== null) {
                try {
                    setStoredValue(JSON.parse(e.newValue));
                } catch (error) {
                    console.error('Erreur lors de la synchronisation du storage:', error);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [key]);

    return [storedValue, setValue, removeValue];
}

/**
 * Hook pour gérer un tableau dans localStorage
 * @param {string} key - Clé du localStorage
 * @param {Array} initialValue - Tableau initial
 */
export function useLocalStorageArray(key, initialValue = []) {
    const [array, setArray] = useLocalStorage(key, initialValue);

    const addItem = useCallback((item) => {
        setArray(prev => [...prev, item]);
    }, [setArray]);

    const removeItem = useCallback((id, idField = 'id') => {
        setArray(prev => prev.filter(item => item[idField] !== id));
    }, [setArray]);

    const updateItem = useCallback((id, updates, idField = 'id') => {
        setArray(prev =>
            prev.map(item =>
                item[idField] === id ? { ...item, ...updates } : item
            )
        );
    }, [setArray]);

    const findItem = useCallback((id, idField = 'id') => {
        return array.find(item => item[idField] === id);
    }, [array]);

    const clearArray = useCallback(() => {
        setArray([]);
    }, [setArray]);

    return {
        array,
        setArray,
        addItem,
        removeItem,
        updateItem,
        findItem,
        clearArray
    };
}

/**
 * Hook pour gérer un objet dans localStorage
 * @param {string} key - Clé du localStorage
 * @param {Object} initialValue - Objet initial
 */
export function useLocalStorageObject(key, initialValue = {}) {
    const [object, setObject] = useLocalStorage(key, initialValue);

    const updateProperty = useCallback((property, value) => {
        setObject(prev => ({
            ...prev,
            [property]: value
        }));
    }, [setObject]);

    const updateProperties = useCallback((updates) => {
        setObject(prev => ({
            ...prev,
            ...updates
        }));
    }, [setObject]);

    const removeProperty = useCallback((property) => {
        setObject(prev => {
            const newObj = { ...prev };
            delete newObj[property];
            return newObj;
        });
    }, [setObject]);

    const clearObject = useCallback(() => {
        setObject({});
    }, [setObject]);

    return {
        object,
        setObject,
        updateProperty,
        updateProperties,
        removeProperty,
        clearObject
    };
}

export default useLocalStorage;