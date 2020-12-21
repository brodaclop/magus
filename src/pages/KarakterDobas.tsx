import React from 'react';
import { KepessegDobas, KepessegDobasResult, KEPESSEG_NEV } from '../engine/kasztok';
import { DobasEredmeny } from '../components/DobasEredmeny';

export const KarakterDobas: React.FC<{ dobas?: Record<string, KepessegDobas>, result?: Record<string, KepessegDobasResult> }> = ({ dobas, result }) => {
    return <table>
        <tbody>
            <tr>
                <th>Képesség</th>
                {Object.keys(dobas ?? {}).map(n => <>
                    <th>{n} Dobás</th>
                    <th>{n} Eredmény</th>
                </>)}
            </tr>
            {Object.keys(KEPESSEG_NEV).map((n: any) => {
                const nev = n as keyof KepessegDobas;
                return <tr>
                    <th>{KEPESSEG_NEV[nev]}</th>
                    {Object.keys(dobas ?? {}).map(n => <>
                        <td>{dobas?.[nev]}</td>
                        <td><DobasEredmeny result={result?.[n]?.[nev]} /></td>
                    </>)}
                </tr>;
            })}

        </tbody>
    </table>
}