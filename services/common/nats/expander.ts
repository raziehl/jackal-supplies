/*
 * Copyright 2013-2019 The NATS Authors
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// 'use strict'
//
// import * as dns from 'dns'
// import { parse, UrlWithStringQuery } from 'url'
//
// // Mapping function for SRV records
// function mapSrv(u: UrlWithStringQuery) {
//   return (a: dns.SrvRecord[]) => {
//     return a.map((s: dns.SrvRecord) => {
//       let auth = ''
//       if (u.auth) {
//         auth = u.auth + '@'
//       }
//       let hostPort = s.name
//       if (s.port) {
//         hostPort += ':' + s.port
//       }
//       return u.protocol + '//' + auth + hostPort
//     })
//   }
// }
//
// // expand takes a natsurl, and performs a resolution on the records type of
// // the host in the natsurl and returns a list of nats urls with all the
// // resolved hosts for the record. It only supports "A" and "SRV" records,
// // but additional record types can be parsed by simply providing a new
// // mapping function.
// //
// // expand("nats://user:pass@host:4222", "A", function(err, values) {
// //     console.log(values);
// // });
// //
// // expand("nats://user:pass@host.com", "SRV", function(err, values) {
// //     console.log(values);
// // });
// //
// export async function expand(natsURL: string) {
//   return new Promise<string[]>((resolve, reject) => {
//     const u = parse(natsURL)
//     const fun = mapSrv(u)
//     dns.resolve(u.hostname, 'SRV', function(err, records) {
//       if (err) {
//         reject(err)
//         return
//       }
//       resolve(fun(records))
//     })
//   })
// }
