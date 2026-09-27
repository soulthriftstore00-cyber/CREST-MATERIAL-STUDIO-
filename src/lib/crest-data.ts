import hero from "@/assets/crest-hero-walnut.jpg";
import library from "@/assets/crest-material-library.jpg";
import showroom from "@/assets/crest-showroom.jpg";
import application from "@/assets/crest-application.jpg";

export const images = { hero, library, showroom, application };
export const categories = ["Veneers", "Laminates", "Plywood", "Fluted Panels", "Louvers"];
export const products = [
  { slug:"natural-oak-veneer", name:"Natural Oak Veneer", code:"CR-VN-018", category:"Veneers", finish:"Matte", thickness:"3 mm", colour:"Natural Oak", price:1850, stock:"In Stock", image:hero },
  { slug:"smoked-walnut-veneer", name:"Smoked Walnut Veneer", code:"CR-VN-032", category:"Veneers", finish:"Satin", thickness:"3 mm", colour:"Smoked Walnut", price:2450, stock:"In Stock", image:hero },
  { slug:"stone-grey-laminate", name:"Stone Grey Laminate", code:"CR-LM-042", category:"Laminates", finish:"Super Matte", thickness:"1 mm", colour:"Stone Grey", price:null, stock:"In Stock", image:library },
  { slug:"walnut-rhythm-panel", name:"Walnut Rhythm Panel", code:"CR-FP-008", category:"Fluted Panels", finish:"Natural Oil", thickness:"18 mm", colour:"Walnut", price:3950, stock:"In Stock", image:application },
  { slug:"birch-core-ply", name:"Birch Core Ply", code:"CR-PY-011", category:"Plywood", finish:"Sanded", thickness:"18 mm", colour:"Pale Birch", price:3200, stock:"In Stock", image:library },
  { slug:"linear-oak-louver", name:"Linear Oak Louver", code:"CR-LV-014", category:"Louvers", finish:"Matte", thickness:"30 mm", colour:"Natural Oak", price:null, stock:"Made to Order", image:showroom },
];