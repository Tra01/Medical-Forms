'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

const MyForm = () => {
  const schemaValidation = zod.object({
    voyage: zod.enum(['oui', 'non']).optional(),
    dateVoyage: zod.string().min(1,'Date is required').optional(),
    paysVisite: zod.string().min(1,'Country is required').optional(),
    moyensVoyage: zod.array(zod.enum(['voiture', 'train', 'avion', 'autre'])).optional(),
    autreMoyen: zod.string().min(1,'Autre moyen is required').optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    resolver: zodResolver(schemaValidation),
  });

  const [responses, setResponses] = useState([]);
  const voyageValue = watch('voyage');
  const moyensVoyageValue = watch('moyensVoyage');

  const onSubmit = (data) => {
    setResponses([...responses, data]);
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Voulez-vous voyager?</label>
        <div>
          <label>
            <input
              type="radio"
              value="oui"
              {...register('voyage')}
            />
            Oui
          </label>
          <label>
            <input
              type="radio"
              value="non"
              {...register('voyage')}
            />
            Non
          </label>
        </div>
        {errors.voyage === "non" && <p className='text-red-800'>{errors.voyage.message}</p>}
        {voyageValue === 'oui' && (
          <div>
            <label>Date de voyage</label>
            <input
              type="date"
              {...register('dateVoyage')}
            />
            <label>Pays de visite</label>
            <input
              type="text"
              {...register('paysVisite')}
            />
            <label>Avec quoi voulez-vous voyager?</label>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="voiture"
                  {...register('moyensVoyage')}
                />
                Voiture
              </label>
              <label>
                <input
                  type="checkbox"
                  value="train"
                  {...register('moyensVoyage')}
                />
                Train
              </label>
              <label>
                <input
                  type="checkbox"
                  value="avion"
                  {...register('moyensVoyage')}
                />
                Avion
              </label>
              <label>
                <input
                  type="checkbox"
                  value="autre"
                  {...register('moyensVoyage')}
                />
                Autre
              </label>
            </div>
            {moyensVoyageValue && moyensVoyageValue.includes('autre') && (
              <div>
                <label>Autre moyen de voyage</label>
                <input
                  type="text"
                  {...register('autreMoyen')}
                />
              </div>
            )}
          </div>
        )}

        <button type="submit">Envoyer</button>
      </form>

      <h2>Réponses :</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Voyage</th>
            <th>Date de voyage</th>
            <th>Pays de visite</th>
            <th>Moyens de voyage</th>
            <th>Autre moyen</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((response, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{response.voyage}</td>
              <td>{response.dateVoyage}</td>
              <td>{response.paysVisite}</td>
              <td>{response.moyensVoyage}</td>
              <td>{response.autreMoyen}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyForm;
