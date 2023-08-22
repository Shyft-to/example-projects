
import "../resources/assets/css/styles.min.css"

export default function Home() {
  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6">
      <div className="body-wrapper" style={{minHeight: "100vh"}}>
        <div className="container-lg">
          <div className="row pt-4">
            <div className="col-lg-12">
                <div className="card">
                  <div className="card-body py-3">
                    <div className="row align-items-start">
                      <div className="col-8">
                        <h5 className="card-title mb-2 fw-semibold">Raffle Address </h5>
                        <h2 className="fw-semibold mb-0 theme-yellow-text">288.34 <small style={{fontSize: "18px"}}>SOL</small></h2>
                      </div>
                      <div className="col-4">
                        <div className="d-flex justify-content-end">
                          <div
                            className="text-white theme-red-bg rounded rounded-5 py-1 px-3 d-flex align-items-center justify-content-center">
                              Mainnet-beta
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div className="row">
            <div className="col-lg-8 d-flex align-items-strech">
              <div className="card w-100">
                <div className="card-body">
                  <div className="d-sm-flex d-block align-items-center justify-content-between mb-9">
                    <div className="mb-3 mb-sm-0">
                      <h5 className="card-title fw-semibold">Tickets Sold over time</h5>
                    </div>
                    <div>
                      
                    </div>
                  </div>
                  <div id="chart"></div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card overflow-hidden">
                    <div className="card-body p-4">
                      <h5 className="card-title mb-9 fw-semibold">Total Tickets Sold</h5>
                      <div className="row align-items-center">
                        <div className="col-8">
                          <h1 className="fw-semibold mb-1 theme-yellow-text">
                            189
                          </h1>
                        </div>
                        <div className="col-4">
                          <div className="d-flex justify-content-center">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row alig n-items-start">
                        <div className="col-8">
                          <h5 className="card-title mb-9 fw-semibold"> Total Earnings </h5>
                          <h2 className="fw-semibold mb-3 theme-yellow-text">288.34 <small style={{fontSize: "18px"}}>SOL</small></h2>
                        </div>
                        <div className="col-4">
                          <div className="d-flex justify-content-end">
                            <div
                              className="text-white bg-secondary rounded-circle p-6 d-flex align-items-center justify-content-center">
                              <i className="ti ti-currency-dollar fs-6"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row alig n-items-start">
                        <div className="col-8">
                          <h5 className="card-title mb-9 fw-semibold"> Total Earnings </h5>
                          <h2 className="fw-semibold mb-3 theme-yellow-text">288.34 <small style={{fontSize: "18px"}}>SOL</small></h2>
                        </div>
                        <div className="col-4">
                          <div className="d-flex justify-content-end">
                            <div
                              className="text-white bg-secondary rounded-circle p-6 d-flex align-items-center justify-content-center">
                              <i className="ti ti-currency-dollar fs-6"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          <div class="row">
                  <div class="col-lg-4 d-flex align-items-stretch">
                    <div class="card w-100">
                      <div class="card-body p-4">
                        <div class="mb-4">
                          <h5 class="card-title fw-semibold">Recent Transactions</h5>
                        </div>
                        <ul class="timeline-widget mb-0 position-relative mb-n5">
                          <li class="timeline-item d-flex position-relative overflow-hidden">
                            <div class="timeline-time text-light flex-shrink-0 text-end">09:30</div>
                            <div class="timeline-badge-wrap d-flex flex-column align-items-center">
                              <span class="timeline-badge border-2 border border-theme-red flex-shrink-0 my-8"></span>
                              <span class="timeline-badge-border d-block flex-shrink-0"></span>
                            </div>
                            <div class="timeline-desc fs-3 text-light mt-n1">nsbbx..uys bought a total of 8 Tickets</div>
                          </li>
                          <li class="timeline-item d-flex position-relative overflow-hidden">
                            <div class="timeline-time text-dark flex-shrink-0 text-end">10:00 am</div>
                            <div class="timeline-badge-wrap d-flex flex-column align-items-center">
                              <span class="timeline-badge border-2 border border-theme-yellow flex-shrink-0 my-8"></span>
                              <span class="timeline-badge-border d-block flex-shrink-0"></span>
                            </div>
                            <div class="timeline-desc fs-3 text-dark mt-n1 fw-semibold">xTFbx..uys bought a total of 15 Tickets
                            </div>
                          </li>
                          <li class="timeline-item d-flex position-relative overflow-hidden">
                            <div class="timeline-time text-dark flex-shrink-0 text-end">12:00 am</div>
                            <div class="timeline-badge-wrap d-flex flex-column align-items-center">
                              <span class="timeline-badge border-2 border border-success flex-shrink-0 my-8"></span>
                              <span class="timeline-badge-border d-block flex-shrink-0"></span>
                            </div>
                            <div class="timeline-desc fs-3 text-dark mt-n1 fw-semibold">PXbx..uys bought a total of 2 Tickets
                            </div>
                          </li>
                          <li class="timeline-item d-flex position-relative overflow-hidden">
                            <div class="timeline-time text-dark flex-shrink-0 text-end">09:30 am</div>
                            <div class="timeline-badge-wrap d-flex flex-column align-items-center">
                              <span class="timeline-badge border-2 border border-warning flex-shrink-0 my-8"></span>
                              <span class="timeline-badge-border d-block flex-shrink-0"></span>
                            </div>
                            <div class="timeline-desc fs-3 text-dark mt-n1 fw-semibold">LMaFbx..uys bought a total of 15 Tickets
                            </div>
                          </li>
                          <li class="timeline-item d-flex position-relative overflow-hidden">
                            <div class="timeline-time text-dark flex-shrink-0 text-end">09:30 am</div>
                            <div class="timeline-badge-wrap d-flex flex-column align-items-center">
                              <span class="timeline-badge border-2 border border-danger flex-shrink-0 my-8"></span>
                              <span class="timeline-badge-border d-block flex-shrink-0"></span>
                            </div>
                            <div class="timeline-desc fs-3 text-dark mt-n1 fw-semibold">daFbx..uys bought a total of 13 Tickets
                            </div>
                          </li>
                          
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-8 d-flex align-items-stretch">
                    <div class="card w-100">
                      <div class="card-body p-4">
                        <h5 class="card-title fw-semibold mb-4">Top Buyers</h5>
                        <div class="table-responsive">
                          <table class="table text-nowrap mb-0 align-middle">
                            <thead class="text-dark fs-4">
                              <tr>
                                <th class="border-bottom-0">
                                  <h6 class="fw-semibold mb-0">Id</h6>
                                </th>
                                <th class="border-bottom-0">
                                  <h6 class="fw-semibold mb-0">Buyer</h6>
                                </th>
                                <th class="border-bottom-0">
                                  <h6 class="fw-semibold mb-0">Each Ticket</h6>
                                </th>
                                
                                <th class="border-bottom-0">
                                  <h6 class="fw-semibold mb-0">Total Price</h6>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td class="border-bottom-0"><h6 class="fw-semibold mb-0">1</h6></td>
                                <td class="border-bottom-0">
                                    <h6 class="fw-semibold mb-1">wtf.sol</h6>
                                    <span class="fw-normal">9ax2....xdf</span>                          
                                </td>
                                <td class="border-bottom-0">
                                  <p class="mb-0 fw-normal">12</p>
                                </td>
                                
                                <td class="border-bottom-0">
                                  <h6 class="fw-semibold mb-0 fs-4">185</h6>
                                </td>
                              </tr> 
                              <tr>
                                <td class="border-bottom-0"><h6 class="fw-semibold mb-0">1</h6></td>
                                <td class="border-bottom-0">
                                    <h6 class="fw-semibold mb-1">random.sol</h6>
                                    <span class="fw-normal">12xx2....xdf</span>                          
                                </td>
                                <td class="border-bottom-0">
                                  <p class="mb-0 fw-normal">15</p>
                                </td>
                                
                                <td class="border-bottom-0">
                                  <h6 class="fw-semibold mb-0 fs-4">255</h6>
                                </td>
                              </tr> 
                              <tr>
                                <td class="border-bottom-0"><h6 class="fw-semibold mb-0">1</h6></td>
                                <td class="border-bottom-0">
                                    <h6 class="fw-semibold mb-1">9ax2....xdf</h6>
                                    <span class="fw-normal"></span>                          
                                </td>
                                <td class="border-bottom-0">
                                  <p class="mb-0 fw-normal">23</p>
                                </td>
                                
                                <td class="border-bottom-0">
                                  <h6 class="fw-semibold mb-0 fs-4">325</h6>
                                </td>
                              </tr> 
                              <tr>
                                <td class="border-bottom-0"><h6 class="fw-semibold mb-0">1</h6></td>
                                <td class="border-bottom-0">
                                    <h6 class="fw-semibold mb-1">xaj...pase</h6>
                                    <span class="fw-normal"></span>                          
                                </td>
                                <td class="border-bottom-0">
                                  <p class="mb-0 fw-normal">2</p>
                                </td>
                                
                                <td class="border-bottom-0">
                                  <h6 class="fw-semibold mb-0 fs-4">46</h6>
                                </td>
                              </tr> 
                              <tr>
                                <td class="border-bottom-0"><h6 class="fw-semibold mb-0">1</h6></td>
                                <td class="border-bottom-0">
                                    <h6 class="fw-semibold mb-1">xaj...pase</h6>
                                    <span class="fw-normal"></span>                          
                                </td>
                                <td class="border-bottom-0">
                                  <p class="mb-0 fw-normal">2</p>
                                </td>
                                
                                <td class="border-bottom-0">
                                  <h6 class="fw-semibold mb-0 fs-4">46</h6>
                                </td>
                              </tr>
                              <tr>
                                <td class="border-bottom-0"><h6 class="fw-semibold mb-0">1</h6></td>
                                <td class="border-bottom-0">
                                    <h6 class="fw-semibold mb-1">xaj...pase</h6>
                                    <span class="fw-normal"></span>                          
                                </td>
                                <td class="border-bottom-0">
                                  <p class="mb-0 fw-normal">2</p>
                                </td>
                                <td class="border-bottom-0">
                                  <div class="d-flex align-items-center gap-2">
                                    <span class="badge bg-primary rounded-3 fw-semibold">Low</span>
                                  </div>
                                </td>
                                <td class="border-bottom-0">
                                  <h6 class="fw-semibold mb-0 fs-4">46</h6>
                                </td>
                              </tr>
                              <tr>
                                <td class="border-bottom-0"><h6 class="fw-semibold mb-0">2</h6></td>
                                <td class="border-bottom-0">
                                    <h6 class="fw-semibold mb-1">Andrew McDownland</h6>
                                    <span class="fw-normal">Project Manager</span>                          
                                </td>
                                <td class="border-bottom-0">
                                  <p class="mb-0 fw-normal">Real Homes WP Theme</p>
                                </td>
                                <td class="border-bottom-0">
                                  <div class="d-flex align-items-center gap-2">
                                    <span class="badge bg-secondary rounded-3 fw-semibold">Medium</span>
                                  </div>
                                </td>
                                <td class="border-bottom-0">
                                  <h6 class="fw-semibold mb-0 fs-4">$24.5k</h6>
                                </td>
                              </tr> 
                              <tr>
                                <td class="border-bottom-0"><h6 class="fw-semibold mb-0">3</h6></td>
                                <td class="border-bottom-0">
                                    <h6 class="fw-semibold mb-1">Christopher Jamil</h6>
                                    <span class="fw-normal">Project Manager</span>                          
                                </td>
                                <td class="border-bottom-0">
                                  <p class="mb-0 fw-normal">MedicalPro WP Theme</p>
                                </td>
                                <td class="border-bottom-0">
                                  <div class="d-flex align-items-center gap-2">
                                    <span class="badge bg-danger rounded-3 fw-semibold">High</span>
                                  </div>
                                </td>
                                <td class="border-bottom-0">
                                  <h6 class="fw-semibold mb-0 fs-4">$12.8k</h6>
                                </td>
                              </tr>      
                              <tr>
                                <td class="border-bottom-0"><h6 class="fw-semibold mb-0">4</h6></td>
                                <td class="border-bottom-0">
                                    <h6 class="fw-semibold mb-1">Nirav Joshi</h6>
                                    <span class="fw-normal">Frontend Engineer</span>                          
                                </td>
                                <td class="border-bottom-0">
                                  <p class="mb-0 fw-normal">Hosting Press HTML</p>
                                </td>
                                <td class="border-bottom-0">
                                  <div class="d-flex align-items-center gap-2">
                                    <span class="badge bg-success rounded-3 fw-semibold">Critical</span>
                                  </div>
                                </td>
                                <td class="border-bottom-0">
                                  <h6 class="fw-semibold mb-0 fs-4">$2.4k</h6>
                                </td>
                              </tr>                        
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

        </div>
      </div>
    </div>
  )
}
